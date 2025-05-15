import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    // const isSeller = await authSeller(userId);
    // if (!isSeller) {
    //   return NextResponse.json({ success: false, message: "not authorized" });
    // }

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");

    const files = formData.getAll("image");

    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        message: "no files uploaded",
      });
    }

    // Upload images to Cloudinary
    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });
      })
    );

    const image = result.map((result) => result.secure_url);

    await connectDB();

    // Create product in database
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image,
      date: Date.now(),
    });

    // Sync with Base Commerce
    try {
      const syncResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/sync-product`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: newProduct._id }),
        }
      );

      const syncData = await syncResponse.json();

      if (!syncResponse.ok) {
        console.error("Failed to sync with Base Commerce:", syncData.message);
        // Return success since product was created, just sync failed
        return NextResponse.json({
          success: true,
          message: "Product created but sync with Base Commerce failed",
          newProduct,
        });
      }

      return NextResponse.json({
        success: true,
        message: "Upload and sync successful",
        newProduct,
        syncData,
      });
    } catch (syncError) {
      console.error("Sync error:", syncError.message);
      // Return success since product was created, just sync failed
      return NextResponse.json({
        success: true,
        message: "Product created but sync with Base Commerce failed",
        newProduct,
      });
    }
  } catch (error) {
    console.error("Product creation error:", error.message);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

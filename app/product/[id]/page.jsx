"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import {
  Checkout,
  CheckoutButton,
  CheckoutStatus,
} from "@coinbase/onchainkit/checkout";

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  }, [id, products]);

  const createCharge = async () => {
    const response = await fetch("/api/createCharge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productData.name,
        description: productData.description,
        pricing_type: "fixed_price",
        local_price: {
          amount: productData.offerPrice,
          currency: "USD",
        },
      }),
    });

    const data = await response.json();
    return data.chargeId; // Ensure your backend returns the charge ID
  };

  return productData ? (
    <>
      <Navbar />
      <div className="px-6 md:px-16 text-white lg:px-32 pt-14 space-y-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={mainImage || productData.image[0]}
                alt="Product Image"
                className="w-full h-auto object-cover "
                width={1280}
                height={720}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-auto object-cover"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium  mb-4">{productData.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <Image
                    key={i}
                    className="h-4 w-4"
                    src={assets.star_icon}
                    alt="star_icon"
                  />
                ))}
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p>(4.5)</p>
            </div>
            <p className="text-gray-300 mt-3">{productData.description}</p>
            <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice}
              <span className="text-base font-normal text-gray-400 line-through ml-2">
                ${productData.price}
              </span>
            </p>

            <div className="flex flex-col gap-4 mt-10">
              {/* <button
                onClick={() => addToCart(productData._id)}
                className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button> */}
              <button
                onClick={() => {
                  addToCart(productData._id);
                  // router.push("/cart");
                }}
                className="w-full py-3.5 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                Add to Cart
              </button>
              <Checkout chargeHandler={createCharge}>
                <CheckoutButton
                  className="bg-[#EA580C] rounded py-4"
                  text="Checkout with USDC"
                  // coinbaseBranded
                />
                <CheckoutStatus />
              </Checkout>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{" "}
              <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
          </button>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Product;

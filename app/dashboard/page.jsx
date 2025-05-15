"use client";
import React, { useState } from "react";
import {
  FiUpload,
  FiDollarSign,
  FiShoppingBag,
  FiActivity,
} from "react-icons/fi";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const AddProduct = () => {
  const { getToken } = useAppContext();
  const [stats, setStats] = useState({
    transactions: 0,
    balance: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Earphone");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);

    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }

    try {
      const token = await getToken();
      const { data } = await axios.post("/api/product/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setFiles([]);
        setName("");
        setDescription("");
        setCategory("Product");
        setPrice("");
        setOfferPrice("");
        setStats((prev) => ({ ...prev, products: prev.products + 1 }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen w-full max-w-7xl bg-black text-gray-100 p-4 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#111318] rounded p-4 shadow-lg border-l-4 border-indigo-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Transactions</p>
                  <h3 className="text-2xl font-bold">{stats.transactions}</h3>
                </div>
                <div className="p-3 rounded bg-indigo-500/20">
                  <FiActivity className="text-indigo-400 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-[#111318] rounded p-4 shadow-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Wallet Balance</p>
                  <h3 className="text-2xl font-bold">
                    ${stats.balance.toFixed(2)}
                  </h3>
                </div>
                <div className="p-3 rounded bg-green-500/20">
                  <FiDollarSign className="text-green-400 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-[#111318] rounded p-4 shadow-lg border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Products Listed</p>
                  <h3 className="text-2xl font-bold">{stats.products}</h3>
                </div>
                <div className="p-3 rounded bg-orange-500/20">
                  <FiShoppingBag className="text-orange-400 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Add Product Form */}
          <div className="bg-[#111318] rounded shadow-xl p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3">
              Add New Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Images */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Images (Max 4)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <label
                      key={index}
                      htmlFor={`image${index}`}
                      className="relative group cursor-pointer"
                    >
                      <input
                        onChange={(e) => {
                          const updatedFiles = [...files];
                          updatedFiles[index] = e.target.files[0];
                          setFiles(updatedFiles);
                        }}
                        type="file"
                        id={`image${index}`}
                        className="hidden"
                      />
                      <div className="aspect-square w-full rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center bg-gray-900/50 group-hover:bg-gray-700 transition-colors overflow-hidden">
                        {files[index] ? (
                          <img
                            src={URL.createObjectURL(files[index])}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <FiUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                            <span className="text-xs text-gray-400">
                              Upload Image
                            </span>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium mb-2"
                >
                  Product Name
                </label>
                <input
                  id="product-name"
                  type="text"
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>

              {/* Product Description */}
              <div>
                <label
                  htmlFor="product-description"
                  className="block text-sm font-medium mb-2"
                >
                  Product Description
                </label>
                <textarea
                  id="product-description"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
                  placeholder="Describe your product..."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </div>

              {/* Category and Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue={category}
                  >
                    <option value="Product">Product</option>
                    <option value="Service">Service</option>
                    <option value="Freelancer">Freelancer</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="product-price"
                    className="block text-sm font-medium mb-2"
                  >
                    Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <input
                      id="product-price"
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="offer-price"
                    className="block text-sm font-medium mb-2"
                  >
                    Offer Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <input
                      id="offer-price"
                      type="number"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                      onChange={(e) => setOfferPrice(e.target.value)}
                      value={offerPrice}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="min-h-screen w-full max-w-3xl mx-auto bg-black text-gray-100 p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4">
            Please sign in to add products
          </h2>
          <p className="text-gray-400 mb-6">
            You need to create an account or sign in to continue.
          </p>
          <Link
            href="/sign-in"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg transition"
          >
            Sign In / Create Account
          </Link>
        </div>
      </SignedOut>
    </>
  );
};

export default AddProduct;

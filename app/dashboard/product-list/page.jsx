"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2, FiEye, FiPlus } from "react-icons/fi";

const ProductList = () => {
  const { router, getToken, user } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
  });

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/product/seller-list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts(data.products);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = await getToken();
      const { data } = await axios.delete(`/api/product/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success("Product deleted successfully");
        fetchSellerProduct();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setEditFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      offerPrice: product.offerPrice,
    });
  };

  const handleEditSubmit = async (productId) => {
    try {
      const token = await getToken();
      const { data } = await axios.put(
        `/api/product/update/${productId}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Product updated successfully");
        setEditingProduct(null);
        fetchSellerProduct();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  return (
    <div className="min-h-screen w-full bg-black text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Add Product button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Products</h1>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <FiPlus />
            <span>Add Product</span>
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="bg-[#111318] rounded-lg shadow-xl overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1d24]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 hidden md:table-cell">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                      Price
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-[#1a1d24]/50 transition-colors"
                    >
                      {/* Product Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-900/50">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            {editingProduct === product._id ? (
                              <input
                                type="text"
                                name="name"
                                value={editFormData.name}
                                onChange={handleEditChange}
                                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white w-full"
                              />
                            ) : (
                              <div className="text-sm font-medium text-white">
                                {product.name}
                              </div>
                            )}
                            {editingProduct === product._id ? (
                              <textarea
                                name="description"
                                value={editFormData.description}
                                onChange={handleEditChange}
                                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white w-full text-xs mt-1"
                                rows={2}
                              />
                            ) : (
                              <div className="text-xs text-gray-400 line-clamp-2">
                                {product.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        {editingProduct === product._id ? (
                          <select
                            name="category"
                            value={editFormData.category}
                            onChange={handleEditChange}
                            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-sm"
                          >
                            <option value="Product">Product</option>
                            <option value="Service">Service</option>
                            <option value="Freelancer">Freelancer</option>
                          </select>
                        ) : (
                          <span className="text-sm text-gray-300">
                            {product.category}
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingProduct === product._id ? (
                          <div className="flex flex-col gap-2">
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                $
                              </span>
                              <input
                                type="number"
                                name="price"
                                value={editFormData.price}
                                onChange={handleEditChange}
                                className="bg-gray-800 border border-gray-700 rounded pl-6 pr-2 py-1 text-white text-sm w-24"
                                placeholder="Price"
                              />
                            </div>
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                $
                              </span>
                              <input
                                type="number"
                                name="offerPrice"
                                value={editFormData.offerPrice}
                                onChange={handleEditChange}
                                className="bg-gray-800 border border-gray-700 rounded pl-6 pr-2 py-1 text-white text-sm w-24"
                                placeholder="Offer"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-300 line-through">
                              ${product.price}
                            </span>
                            <span className="text-sm font-medium text-indigo-400">
                              ${product.offerPrice}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingProduct === product._id ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(null)}
                              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleEditSubmit(product._id)}
                              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                router.push(`/product/${product._id}`)
                              }
                              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300"
                              title="View"
                            >
                              <FiEye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                              title="Edit"
                            >
                              <FiEdit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="p-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
                              title="Delete"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {products.length === 0 && (
              <div className="p-8 text-center">
                <div className="mx-auto h-24 w-24 text-gray-600">
                  <FiShoppingBag className="w-full h-full" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-300">
                  No products
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding a new product.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => router.push("/seller/add-product")}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                  >
                    <FiPlus className="-ml-0.5 mr-1.5 h-5 w-5" />
                    Add Product
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;

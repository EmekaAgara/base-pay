"use client";
import React, { useEffect, useState } from "react";
// import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiPackage,
  FiTruck,
  FiDollarSign,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";

const Orders = () => {
  const { currency, getToken, user, router } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/order/seller-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setOrders(data.orders);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = await getToken();
      const { data } = await axios.put(
        `/api/order/update-status/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(`Order marked as ${status}`);
        fetchSellerOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerOrders();
    }
  }, [user]);

  return (
    <div className="min-h-screen w-full bg-black text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Order History</h1>
          <div className="text-sm text-gray-400">
            {orders.length} {orders.length === 1 ? "order" : "orders"} found
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-[#111318] rounded-lg p-8 text-center">
                <div className="mx-auto h-24 w-24 text-gray-600 mb-4">
                  <FiPackage className="w-full h-full" />
                </div>
                <h3 className="text-lg font-medium text-gray-300">
                  No orders yet
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  When you receive orders, they'll appear here.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-[#111318] rounded-lg shadow-lg border border-gray-800 hover:border-indigo-500/30 transition-colors"
                >
                  {/* Order Header */}
                  <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-500/10 p-2 rounded-lg">
                        <FiPackage className="text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </h3>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <FiCalendar className="text-xs" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : order.status === "shipped"
                          ? "bg-blue-500/20 text-blue-400"
                          : order.status === "delivered"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>

                  {/* Order Content - All details visible */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Order Items */}
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-gray-300 mb-3 flex items-center gap-2 text-sm">
                          <FiPackage className="text-sm" />
                          Ordered Items
                        </h4>
                        <div className="space-y-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex gap-3">
                              <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-900/50 border border-gray-800">
                                <Image
                                  src={item.product.image[0]}
                                  alt={item.product.name}
                                  width={64}
                                  height={64}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-white">
                                  {item.product.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                  Qty: {item.quantity} × {currency}
                                  {item.product.offerPrice}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-sm text-gray-400">
                                    Total: {currency}
                                    {(
                                      item.quantity * item.product.offerPrice
                                    ).toFixed(2)}
                                  </p>
                                  <button
                                    onClick={() =>
                                      router.push(
                                        `/product/${item.product._id}`
                                      )
                                    }
                                    className="text-xs text-indigo-400 hover:text-indigo-300"
                                  >
                                    View Product
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping & Payment Info */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2 flex items-center gap-2 text-sm">
                            <FiMapPin className="text-sm" />
                            Shipping To
                          </h4>
                          <div className="bg-[#1a1d24] p-3 rounded-lg text-sm">
                            <p className="font-medium">
                              {order.address.fullName}
                            </p>
                            <p className="text-gray-400">
                              {order.address.area}
                            </p>
                            <p className="text-gray-400">
                              {order.address.city}, {order.address.state}
                            </p>
                            <p className="text-gray-400 mt-2 flex items-center gap-1">
                              <FiPhone className="text-xs" />
                              {order.address.phoneNumber}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-300 mb-2 flex items-center gap-2 text-sm">
                            <FiCreditCard className="text-sm" />
                            Payment
                          </h4>
                          <div className="bg-[#1a1d24] p-3 rounded-lg text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Method:</span>
                              <span>Cash on Delivery</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-gray-400">Status:</span>
                              <span>Pending</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-gray-400">Items:</span>
                              <span>{order.items.length}</span>
                            </div>
                            <div className="flex justify-between mt-2 pt-2 border-t border-gray-800 font-medium">
                              <span>Total:</span>
                              <span className="text-indigo-400">
                                {currency}
                                {order.amount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="mt-6 pt-4 border-t border-gray-800 flex flex-wrap gap-3 justify-end">
                      {order.status === "pending" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order._id, "shipped")
                          }
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center gap-2"
                        >
                          <FiTruck className="text-sm" /> Mark as Shipped
                        </button>
                      )}
                      {order.status === "shipped" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order._id, "delivered")
                          }
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm flex items-center gap-2"
                        >
                          ✓ Mark as Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;

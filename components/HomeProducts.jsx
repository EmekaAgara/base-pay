"use client";
import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <section className="py-20 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">
        Recommended Products & Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border-gray-900 border rounded-2xl p-4 shadow-lg hover:scale-[1.03] transition-transform cursor-pointer"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => router.push("/all-products")}
          className="px-10 py-2.5 border border-gray-300 rounded text-gray-300 hover:bg-white hover:text-black transition"
        >
          See more
        </button>
      </div>
    </section>
  );
};

export default HomeProducts;

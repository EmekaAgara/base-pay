import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        scrollTo(0, 0);
      }}
      className="w-full"
    >
      <div className="relative w-full h-70 max-h-60 rounded-xl overflow-hidden group mb-4">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          width={800}
          height={800}
        />
      </div>

      <h3 className="text-lg font-semibold text-white truncate">
        {product.name}
      </h3>
      <p className="text-sm text-gray-400 truncate">{product.description}</p>

      <div className="mt-1 flex justify-between items-center">
        <span className="text-green-400 font-bold">
          {currency}
          {product.offerPrice}
        </span>
        <button
          onClick={() => {
            router.push("/product/" + product._id);
            scrollTo(0, 0);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-sm px-4 py-2 rounded text-white"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

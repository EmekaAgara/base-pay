import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const Banner = () => {
  const { router } = useAppContext();
  return (
    <section className="py-20 rounded-lg bg-[#111318] text-center px-6">
      <h2 className="text-3xl text-white font-bold mb-6">
        Start Accepting Crypto Today
      </h2>
      <p className="text-gray-400 max-w-xl mx-auto mb-8">
        Join BasePay and unlock the future of payments using secure, fast, and
        stable USDC.
      </p>
      <button
        onClick={() => router.push("/dashboard")}
        className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded font-semibold text-white transition-all"
      >
        Get Started ToDAY
      </button>
    </section>
  );
};

export default Banner;

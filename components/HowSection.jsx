import React from "react";
import { motion } from "framer-motion";

const HowSection = () => {
  return (
    <div className="mt-14">
      {/* Features Section */}
      <section className="py-20 px-6 md:px-16 bg-black">
        <h2 className="text-3xl text-white font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Connect Wallet",
              desc: "Securely connect your Coinbase wallet to begin.",
              icon: "🔐",
            },
            {
              title: "List Products",
              desc: "Easily create listings for products or services.",
              icon: "📦",
            },
            {
              title: "Get Paid in USDC",
              desc: "Buyers pay in USDC using Coinbase’s onchain payments.",
              icon: "💸",
            },
          ].map(({ title, desc, icon }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#111318] rounded-2xl p-6 shadow-xl text-center"
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl text-white font-semibold mb-2">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowSection;

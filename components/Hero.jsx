import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const Hero = () => {
  const { router } = useAppContext();
  const paymentMethods = ["List", "Buy", "Sell", "Post"];
  const [currentMethod, setCurrentMethod] = useState(0);
  const productImages = [
    "/crypto1.jpg",
    "/crypto2.jpg",
    "/crypto3.jpg",
    "/crypto4.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  // Payment method rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMethod((prev) => (prev + 1) % paymentMethods.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Product image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % productImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Centered container with two-column layout on desktop */}
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Left Column - Content */}
          <div className="w-full flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-8xl  font-medium leading-relaxed mb-6"
            >
              <motion.span
                key={paymentMethods[currentMethod]}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
              >
                {paymentMethods[currentMethod]}
              </motion.span>{" "}
              Products & services securely on Basepayy{" "}
              {/* <br className="hidden sm:block" /> Prouducts & Services{" "} */}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-sm sm:text-md text-gray-300 max-w-2xl mb-8"
            >
              BasePay lets you list,buy and sell products and services without
              borders. Fast, secure crypto payments. No middlemen. No limits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded transition-all shadow-lg hover:shadow-purple-500/20 whitespace-nowrap"
              >
                Get Started
              </button>
              <button className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 px-8 py-4 rounded transition-all whitespace-nowrap">
                How It Works
              </button>
            </motion.div>
          </div>

          {/* Right Column - Product Showcase */}
          <div className="w-full flex justify-center">
            <div className="relative hover:scale-105 transition-all w-full max-w-2xl h-120 sm:h-80 md:h-96 lg:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border border-gray-700/50"
                >
                  <Image
                    src={productImages[currentImage]}
                    alt="Blockchain marketplace example"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                    priority
                  />
                  {/* Product card overlay */}
                  <div
                    onClick={() => router.push("/all-products")}
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"
                  >
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="font-bold text-lg">
                          Sample Product & Services
                        </h3>
                        <p className="text-purple-300 font-medium">$49.99</p>
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Blockchain network indicators */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="absolute -top-5 -left-5 w-12 h-12 bg-purple-500/10 rounded-full blur-md"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                className="absolute -bottom-5 -right-5 w-16 h-16 bg-blue-500/10 rounded-full blur-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

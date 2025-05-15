"use client";
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Hero from "@/components/Hero";
import NewsLetter from "@/components/NewsLetter";
import HowSection from "@/components/HowSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 mx-auto max-w-7xl">
        <HeaderSlider />
        <HomeProducts />
        <HowSection />
        <Hero />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;

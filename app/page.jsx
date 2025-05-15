"use client";
import React from "react";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import How from "@/components/How";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 mx-auto max-w-7xl">
        <Hero />
        <Products />
        <How />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;

"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  {/* INTEGRASI ARTIKEL DARI BACKEND */}
  const texts = [
    "Reduce plastic waste and protect marine life.",
    "Recycling helps conserve natural resources.",
    "Composting reduces landfill waste and benefits soil health.",
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? texts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="font-poppins">
      <Navbar />

      {/* Section 1: Hero */}
      <main
        className="min-h-screen bg-cover bg-center flex items-center text-white px-6 md:px-12"
        style={{ backgroundImage: "url('/bg-landing-page.png')" }}
      >
        <div className="max-w-7xl text-left mx-auto translate-x-4 md:-translate-x 2xl:-translate-x-36">
          <h1 className="text-7xl font-bold">Scan. Sort. Save the Planet!</h1>
          <p className="text-4xl mt-3 tracking-widest">Effortlessly identify waste.</p>
          <p className="text-4xl mt-1 tracking-widest">Make a better future.</p>
        </div>
      </main>

      {/* Section 2: Quote */}
      <section className="py-20 bg-white text-center relative">
        <div className="max-w-3xl mx-auto px-6 relative">
          <img
            src="/quote1.png"
            alt="Opening Quote"
            className="absolute -left-20 -top-6 w-16 md:w-20"
          />

          <p className="pt-12 text-2xl font-medium leading-relaxed text-black tracking-wider">
            The greatest threat to our planet is the belief that someone
            <br></br> else will save it.
          </p>

          <p className="pb-12 mt-4 text-xl font-semibold text-black">Robert Swan.</p>
          <img
            src="/quote2.png"
            alt="Closing Quote"
            className="absolute -right-20 -bottom-6 w-16 md:w-20"
          />
        </div>
      </section>

      {/* Section 3: Artikel */}
      <section className="bg-[#F4FFC3] py-16 flex justify-center items-center relative">
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition"
        >
          ❮
        </button>

        <div className="max-w-8xl flex flex-col md:flex-row items-center">
          <div className="w-96 h-96 md:w-[550px] md:h-[550px] flex-shrink-0 animate-spin-slow">
            <Image src="/earth.png" alt="Earth" width={550} height={550} />
          </div>
          <div className="md:ml-12 text-center md:text-left max-w-2xl px-6">
            <h2 className="text-2xl md:text-4xl font-bold text-black">
              Reduce Waste, Healthy Earth
            </h2>
            <p className="text-lg mt-4 text-black">{texts[currentIndex]}</p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition"
        >
          ❯
        </button>
      </section>

      {/* Section 4: Products & Services */}
      <section id="our-products" className="py-20 bg-white text-center text-black">
        <h2 className="text-3xl md:text-5xl font-bold text-black mb-16">
          Our Products & Services
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          {/* Product 1 */}
          <div className="flex flex-col items-center">
            <Image src="/product1.png" alt="Smart Waste Management System" width={250} height={250} />
            <h3 className="text-xl font-semibold mt-4">Smart Waste Management System</h3>
            <p className="text-gray-600 mt-2">
              A web-based platform to optimize waste management processes.
            </p>
          </div>

          {/* Product 2 */}
          <div className="flex flex-col items-center">
            <Image src="/product2.png" alt="Waste Tracking & Analytics Dashboard" width={251} height={251} />
            <h3 className="text-xl font-semibold mt-4">Waste Tracking & Analytics Dashboard</h3>
            <p className="text-gray-600 mt-2">
              A web & AI-based platform to detect and optimize waste management.
            </p>
          </div>

          {/* Product 3 */}
          <div className="flex flex-col items-center">
            <Image src="/product3.png" alt="Waste Classification AI" width={342} height={300} />
            <h3 className="text-xl font-semibold mt-4">Waste Classification AI</h3>
            <p className="text-gray-600 mt-2">
              A web-based platform for optimizing waste classification using AI.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ChatWidget from "@/components/ChatWidget";

const productVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: delay,
      duration: 1,
    },
  }),
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const texts = [
    "Reducing waste starts with our daily habits. By using reusable bags, bottles, and containers, we can cut down on single-use plastics. Avoiding unnecessary packaging and buying only what we need also helps minimize waste. Small changes in lifestyle can make a big difference for the environment.",
    "Loving the Earth means taking responsibility for how we treat our planet. Simple acts like planting trees, saving water, and conserving energy show our care. When we protect nature, we ensure a better future for the next generations. The Earth gives us life—let’s give it love in return.",
    "Sorting waste into the right categories—organic, inorganic, and hazardous—is essential for effective recycling. This helps reduce pollution and ensures that recyclable materials can be reused. Organic waste can be composted, while plastics, metals, and glass go to recycling centers. Proper waste sorting is a small step with a big environmental impact.",
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? texts.length - 1 : prevIndex - 1
    );
  };

  const quotes = [
    {
      quote:
        "The greatest threat to our planet is the belief that someone else will save it.",
      author: "Robert Swan.",
    },
    {
      quote:
        "We do not inherit the earth from our ancestors, we borrow it from our children.",
      author: "Native American Proverb.",
    },
    {
      quote: "The earth is what we all have in common.",
      author: "Wendell Berry.",
    },
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="font-poppins">
      <Navbar />

      {/* Section 1: Hero */}
      <main
        className="min-h-screen bg-cover bg-center flex items-center text-white px-6 md:px-12"
        style={{ backgroundImage: "url('/bg-landing-page.png')" }}
      >
        <div className="max-w-7xl text-left mx-auto translate-x-4 md:-translate-x 2xl:-translate-x-36">
        <motion.h1
            className="text-7xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Scan. Sort. Save the Planet!
          </motion.h1>
          <motion.p
            className="text-4xl mt-3 tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Effortlessly identify waste.
          </motion.p>
          <motion.p
            className="text-4xl mt-1 tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Make a better future.
          </motion.p>
        </div>
      </main>

      {/* Section 2: Quote */}
      <section className="py-20 bg-white text-center relative">
        <div className="max-w-3xl mx-auto px-6 relative">
          <Image
            src="/quote1.png"
            alt="Opening Quote"
            width={64}
            height={64}
            className="absolute -left-20 -top-6 w-16 md:w-20"
          />
          <div className="relative h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <p className="text-2xl font-medium leading-relaxed text-black tracking-wider">
                  {quotes[currentQuote].quote}
                </p>
                <p className="mt-4 text-xl font-semibold text-black">
                  {quotes[currentQuote].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <Image
            src="/quote2.png"
            alt="Closing Quote"
            width={64}
            height={64}
            className="absolute -right-20 -bottom-6 w-16 md:w-20"
          />
        </div>
      </section>

      {/* Section 3: Artikel */}
      <section className="bg-[#F4FFC3] py-16 flex justify-center items-center relative">
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition cursor-pointer"
        >
          <FiChevronLeft size={24} />
        </button>
        <div className="max-w-8xl flex flex-col md:flex-row items-center">
          <div className="w-96 h-96 md:w-[550px] md:h-[550px] flex-shrink-0 animate-spin-slow">
            <Image src="/earth.png" alt="Earth" width={550} height={550} />
          </div>
          <div className="md:ml-12 text-center md:text-left max-w-2xl px-6">
            <h2 className="text-2xl md:text-4xl font-bold text-black">
              Reduce Waste, Healthy Earth
            </h2>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg mt-4 text-black"
              >
                {texts[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-10 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition cursor-pointer"
        >
          <FiChevronRight size={24} />
        </button>
      </section>

      
      <Footer />
      <ChatWidget />
    </div>
  );
}

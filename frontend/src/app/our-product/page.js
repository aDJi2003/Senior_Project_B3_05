"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import NavbarBackground from "@/components/navbar-background";
import Footer from "@/components/footer";
import ChatWidget from "@/components/ChatWidget";
import ProtectedRoute from "@/components/ProtectedRoute";

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

export default function ProductsPage() {
  return (
      <div className="font-poppins">
        <NavbarBackground />

        <section className="pt-32 py-20 bg-white text-center text-black">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">
            Our Products & Services
          </h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
            {/* Product 1 */}
            <motion.div
              className="flex flex-col items-center"
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={productVariants}
            >
              <Image
                src="/product1.png"
                alt="Smart Waste Management System"
                width={250}
                height={250}
              />
              <h3 className="text-xl font-semibold mt-4">
                Smart Waste Management System
              </h3>
              <p className="text-gray-600 mt-2">
                A web-based platform to optimize waste management processes.
              </p>
            </motion.div>

            {/* Product 2 */}
            <motion.div
              className="flex flex-col items-center"
              custom={0.4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={productVariants}
            >
              <Image
                src="/product2.png"
                alt="Waste Tracking & Analytics Dashboard"
                width={251}
                height={251}
              />
              <h3 className="text-xl font-semibold mt-4">
                Waste Tracking & Analytics Dashboard
              </h3>
              <p className="text-gray-600 mt-2">
                A web & AI-based platform to detect and optimize waste
                management.
              </p>
            </motion.div>

            {/* Product 3 */}
            <motion.div
              className="flex flex-col items-center"
              custom={0.6}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={productVariants}
            >
              <Image
                src="/product3.png"
                alt="Waste Classification AI"
                width={342}
                height={300}
              />
              <h3 className="text-xl font-semibold mt-4">
                Waste Classification AI
              </h3>
              <p className="text-gray-600 mt-2">
                A web-based platform for optimizing waste classification using
                AI.
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
        <ChatWidget />
      </div>
  );
}

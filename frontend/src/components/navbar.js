"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto py-5 flex items-center justify-between">
        {/* Logo - Fully Left */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Trashify Logo" width={240} height={80} />
          </Link>
        </div>

        {/* Centered Menu with Custom Color */}
        <div className="hidden md:flex flex-1 justify-center space-x-16 font-bold font-poppins text-[#F4FFC3] text-lg">
          <Link href="/" className="hover:text-gray-500">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-500">
            About Us
          </Link>
          <Link href="/services" className="hover:text-gray-500">
            Our Services
          </Link>
          <Link href="/contact" className="hover:text-gray-500">
            Contact Us
          </Link>
        </div>

        {/* Right-aligned Login Button */}
        <div className="flex justify-end">
          <Link
            href="/login"
            className="bg-green-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-green-600"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

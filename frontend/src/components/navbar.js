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
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="Trashify Logo" width={150} height={50} />
        </div>

        {/* Menu */}
        <div className="hidden md:flex space-x-6 font-poppins text-white">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About Us
          </Link>
          <Link href="/services" className="hover:text-gray-300">
            Our Services
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact Us
          </Link>
        </div>

        {/* Login Button */}
        <Link
          href="/login"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

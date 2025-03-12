"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto py-5 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Trashify Logo" width={240} height={80} />
          </Link>
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#F4FFC3">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#F4FFC3">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden md:flex flex-1 justify-center space-x-16 font-bold font-poppins text-[#F4FFC3] text-lg">
          <Link href="/" className="hover:text-gray-500">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-500">
            About Us
          </Link>
          <Link href="/#our-products" className="hover:text-gray-500" scroll={true}>
            Our Services
          </Link>
          <Link href="/contact" className="hover:text-gray-500">
            Contact Us
          </Link>
        </div>

        <div className="hidden md:flex justify-end">
          <Link
            href="/login"
            className="bg-green-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-green-600"
          >
            Login
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-8 font-bold font-poppins text-[#F4FFC3] text-2xl">
            <Link href="/" className="hover:text-gray-500" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-500" onClick={toggleMenu}>
              About Us
            </Link>
            <Link href="/#our-products" scroll={true} className="hover:text-gray-500" onClick={toggleMenu}>
              Our Services
            </Link>
            <Link href="/contact" className="hover:text-gray-500" onClick={toggleMenu}>
              Contact Us
            </Link>
            <Link
              href="/login"
              className="bg-green-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-green-600 mt-4"
              onClick={toggleMenu}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
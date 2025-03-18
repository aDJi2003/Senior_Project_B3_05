"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NavbarUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#5D8736]">
      <div className="max-w-7xl mx-auto py-5 px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Trashify Logo" width={240} height={80} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center space-x-16 font-bold font-poppins text-[#F4FFC3] text-lg">
          <Link href="/dashboard" className="hover:text-gray-500">
            Dashboard
          </Link>
          <Link href="/organicWaste" className="hover:text-gray-500">
            Articles
          </Link>
          <Link href="/scanWaste" scroll={true} className="hover:text-gray-500">
            Scan Waste
          </Link>
          <Link href="/history" className="hover:text-gray-500">
            History
          </Link>
        </div>

        {/* Profile Section */}
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-[#F4FFC3] font-bold text-lg">Admin</span>
          <Link href="/profile">
            <Image src="/profile.png" alt="Profile" width={40} height={40} className="rounded-full cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#5D8736] bg-opacity-95 z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center space-y-8 font-bold font-poppins text-[#F4FFC3] text-2xl">
            <Link href="/dashboard" className="hover:text-gray-500" onClick={toggleMenu}>
              Dashboard
            </Link>
            <Link href="/organicWaste" className="hover:text-gray-500" onClick={toggleMenu}>
              Articles
            </Link>
            <Link href="/scanWaste" scroll={true} className="hover:text-gray-500" onClick={toggleMenu}>
              Scan Waste
            </Link>
            <Link href="/history" className="hover:text-gray-500" onClick={toggleMenu}>
              History
            </Link>

            {/* Profile in Mobile Menu */}
            <div className="flex flex-col items-center mt-6 space-y-2">
              <Image src="/profile.png" alt="Profile" width={60} height={60} className="rounded-full" />
              <span className="text-[#F4FFC3] text-xl font-semibold">Admin</span>
              <Link href="/profile" className="text-white hover:text-gray-300" onClick={toggleMenu}>
                View Profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarUser;

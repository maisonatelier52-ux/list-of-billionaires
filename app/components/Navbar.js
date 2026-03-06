"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FaMicrochip,
  FaChartLine,
  FaShoppingBag,
  FaIndustry,
  FaTruck,
  FaMountain,
  FaBars,
} from "react-icons/fa";

const categories = [
  { name: "Technology", slug: "technology", icon: FaMicrochip },
  { name: "Finance", slug: "finance", icon: FaChartLine },
  { name: "Fashion & Retail", slug: "fashion-and-retail", icon: FaShoppingBag },
  { name: "Manufacturing", slug: "manufacturing", icon: FaIndustry },
  { name: "Logistics", slug: "logistics", icon: FaTruck },
  { name: "Metals & Mining", slug: "metals-mining", icon: FaMountain },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-black shadow-xl sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={120}
            height={100}
            className="inline-block"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 relative">

          {/* Categories Dropdown */}
          <div className="relative" ref={dropdownRef}>

            <button
              onClick={() => setOpen(!open)}
              className="text-sm text-white hover:text-gray-300 transition focus:outline-none flex items-center gap-1"
            >
              Categories <FaBars/>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-3 w-[400px] bg-zinc-900 text-white shadow-2xl p-3 transform transition-all duration-200 ${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {/* Grid Layout */}
              <div className="grid grid-cols-2 gap-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;

                  return (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-all duration-200 hover:bg-gray-600"
                    >
                      {/* Icon */}
                      <Icon className="text-gray-600 group-hover:text-black transition" />

                      {/* Text with slide animation */}
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {cat.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </nav>
      </div>
    </header>
  );
}
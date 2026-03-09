"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const categories = [
  "Technology",
  "Finance",
  "Fashion & Retail",
  "Manufacturing",
  "Logistics",
  "Metals & Mining"
];

const rankings = [
  "USA",
  "Female",
  "Top 10",
  "Youngest Billionaires"
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

const quickLinks = [
  { label: "Fictional Characters", href: "/fictional" },
  { label: "About Us", href: "/about" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-14 py-5">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-5 border-b border-gray-200">

          {/* Left - Branding */}
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl md:text-3xl font-extrabold">
              List of Billionaires
            </Link>
          </div>

          {/* Center - Social Text */}
          <div className="my-4 md:my-0 text-lg text-gray-700 text-center md:text-left">
            Follow us on social media
          </div>

          {/* Right - Social Media Icons */}
          <div className="flex justify-center md:justify-start gap-6 text-xl">
            {[
              { Icon: FaFacebookF, hover: "hover:text-blue-600" },
              { Icon: FaTwitter, hover: "hover:text-sky-500" },
              { Icon: FaInstagram, hover: "hover:text-pink-500" },
              { Icon: FaYoutube, hover: "hover:text-red-600" },
            ].map(({ Icon, hover }, i) => (
              <a
                key={i}
                href="#"
                target="_blank"
                rel="noreferrer"
                className={`transition-colors duration-200 ${hover}`}
              >
                <Icon />
              </a>
            ))}
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-10">

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categories/${slugify(cat)}`}
                    className="hover:text-gray-400 transition-colors px-2 py-1 rounded"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rankings */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm tracking-wider">
              Rankings
            </h3>
            <ul className="space-y-2 text-sm">
              {rankings.map((rank) => (
                <li key={rank}>
                  <Link
                    href={`/categories/${rank.toLowerCase()}`}
                    className="hover:text-gray-400 transition-colors px-2 py-1 rounded"
                  >
                    {rank}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-gray-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 uppercase text-sm tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Subscribe to receive the latest billionaire rankings and financial insights.
            </p>

            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded-md"
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded-md"
              />
              <button
                type="submit"
                className="bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

      </div>

      <span className="block h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      {/* COPYRIGHT */}
      <div className="py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} List of Billionaires. All rights reserved.
      </div>
    </footer>
  );
}
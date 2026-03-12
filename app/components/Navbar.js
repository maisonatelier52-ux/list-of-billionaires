"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaBars, FaTimes, FaChevronRight, FaChevronDown } from "react-icons/fa";

const continentCountries = {
  "north-america": ["usa", "canada", "mexico"],
  "latin-america": ["chile", "brazil"],
  asia: ["india", "china", "japan", "hong-kong", "israel", "indonesia"],
  europe: [
    "france",
    "spain",
    "germany",
    "italy",
    "austria",
    "switzerland",
    "uk",
    "czechia",
  ],
  oceania: ["australia"],
  africa: ["nigeria"],
};

const industries = [
  "Technology",
  "Finance",
  "Fashion and Retail",
  "Diversified",
  "Food and Beverage",
  "Healthcare",
  "Manufacturing",
  "Real Estate",
  "Logistics",
  "Metals and Mining",
  "Telecom",
  "Automotive",
  "Construction",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoveredContinent, setHoveredContinent] = useState(null);
  const [submenuPos, setSubmenuPos] = useState({ top: 0 });
  const [industryOpen, setIndustryOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setHoveredContinent(null);
  }, [pathname]);

  const SIDEBAR_WIDTH = 360;

  const handleMouseEnter = (continent, e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setHoveredContinent(continent);
    setSubmenuPos({
      top: rect.top,
    });
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-black sticky top-0 z-50 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.jpg" alt="Logo" width={120} height={100} />
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="text-white flex items-center gap-2"
          >
            Menu <FaBars />
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => {
          setOpen(false);
          setHoveredContinent(null);
        }}
        className={`fixed inset-0 bg-black/60 z-40 transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR RIGHT */}
      <aside
        onMouseLeave={() => setHoveredContinent(null)}
        className={`fixed top-0 right-0 w-[360px] h-screen bg-zinc-950 z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b border-zinc-800">
          <h2 className="text-white font-semibold">Browse Categories</h2>

          <button
            onClick={() => setOpen(false)}
            className="text-zinc-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* TYPE */}
          <Section title="Categories">
            <SidebarLink href="/categories/youngest-billionaires">
              Youngest Billionaires
            </SidebarLink>

            <SidebarLink href="/categories/female">
              Female Billionaires
            </SidebarLink>
          </Section>

          {/* CONTINENTS */}
          <Section title="Continental Regions">
            {Object.keys(continentCountries).map((continent) => (
              <div
                key={continent}
                onMouseEnter={(e) => handleMouseEnter(continent, e)}
              >
                <Link
                  href={`/region/${continent}`}
                  className="flex justify-between items-center text-sm text-zinc-300 hover:text-white"
                >
                  {formatName(continent)}
                  <FaChevronRight className="text-xs opacity-60" />
                </Link>
              </div>
            ))}
          </Section>

          {/* INDUSTRY */}
          <Section title="Industry">
            <button
              onClick={() => setIndustryOpen(!industryOpen)}
              className="flex justify-between items-center w-full text-sm text-zinc-300 hover:text-white"
            >
              All Industries
              <FaChevronDown
                className={`text-xs transition ${
                  industryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {industryOpen && (
              <div className="space-y-2 mt-2">
                {industries.map((industry) => (
                  <Link
                    key={industry}
                    href={`/industry/${slugify(industry)}`}
                    className="block text-sm text-zinc-400 hover:text-white"
                  >
                    {industry}
                  </Link>
                ))}
              </div>
            )}
          </Section>

          {/* SPECIAL */}
          <Section title="Special Lists">
            <SidebarLink href="/categories/philanthropists">
              Top Philanthropists
            </SidebarLink>
          </Section>

        </div>
      </aside>

      {/* SUBMENU LEFT OF SIDEBAR */}
      {hoveredContinent && (
        <div
          onMouseEnter={() => setHoveredContinent(hoveredContinent)}
          onMouseLeave={() => setHoveredContinent(null)}
          className="fixed z-[60] bg-zinc-950 border border-zinc-800 rounded-md shadow-xl p-4 space-y-2 w-44"
          style={{
            right: SIDEBAR_WIDTH,
            top: submenuPos.top,
          }}
        >
          {continentCountries[hoveredContinent].map((country) => (
            <Link
              key={country}
              href={`/country/${country}`}
              className="block text-sm text-zinc-300 hover:text-white"
            >
              {formatName(country)}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

/* COMPONENTS */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xs uppercase text-zinc-500 mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function SidebarLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block text-sm text-zinc-300 hover:text-white"
    >
      {children}
    </Link>
  );
}

/* HELPERS */

function formatName(str) {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}
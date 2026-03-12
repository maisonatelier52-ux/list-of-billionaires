"use client";

import Link from "next/link";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

function getCountryCode(countryName) {
  return countries.getAlpha2Code(countryName, "en");
}

export default function PhilanthropistsTable({ data }) {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl">
        <table className="min-w-full text-sm text-zinc-300">
          
          <thead className="bg-zinc-900 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">#</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Rank</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Name</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-400">Donated ($B)</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-400">Net Worth ($B)</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Country</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Source</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Industry</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {currentData.map((person) => (
              <tr
                key={person.Rank}
                className="hover:bg-zinc-900 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-zinc-500">
                  {startIndex + currentData.indexOf(person) + 1}
                </td>
                <td className="px-6 py-4 font-semibold text-white">
                  {person.Rank}
                </td>

                <td className="px-6 py-4 font-semibold text-zinc-300">
                  <Link
                    href={`/${person.Name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-white transition"
                  >
                    {person.Name}
                  </Link>
                </td>

                <td className="px-6 py-4 text-center font-semibold text-green-400">
                  ${person.Total_Donated_USD_Billion.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-center font-semibold text-green-400">
                  ${person.Net_Worth_USD_Billion.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-zinc-400 gap-2 flex items-center">
                  <ReactCountryFlag
                    countryCode={getCountryCode(person.Country)}
                    svg
                    style={{ width: "20px", height: "15px" }}
                  />
                  {person.Country}
                </td>

                <td className="px-6 py-4 text-zinc-400">
                  {person.Source_of_Wealth}
                </td>

                <td className="px-6 py-4 text-zinc-400">
                  {person.Industry}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2">
        
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 text-sm rounded-lg transition ${
              currentPage === i + 1
                ? "bg-white text-black font-semibold"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next
        </button>

      </div>

    </div>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";

export default function BillionairesTable({ data }) {
//   const billionaires = [...data.billionaires].sort(
//     (a, b) => parseWealth(b.estimatedWealth) - parseWealth(a.estimatedWealth)
//   );

  const billionaires = [...data.billionaires]

  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(billionaires.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = billionaires.slice(startIndex, startIndex + ITEMS_PER_PAGE);

   return (
    <div className="space-y-6">
      
      {/* TABLE */}
      <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-950">
        <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4 text-left">Rank</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Estimated Wealth</th>
            <th className="px-6 py-4 text-left">Country / Empire</th>
            <th className="px-6 py-4 text-left">Era</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {currentData.map((person) => (
            <tr
              key={person.rank}
              className="border-t border-zinc-800 hover:bg-zinc-900 transition"
            >
              <td className="px-6 py-4 text-zinc-400 font-medium">
                #{person.rank}
              </td>

              <td className="px-6 py-4 font-semibold text-white">
                <Link href={`/billionaires-ever-lived/${person.slug}`}>
                {person.name}
                </Link>
              </td>

              <td className="px-6 py-4 text-green-400 font-semibold">
                {person.estimatedWealth}
              </td>

              <td className="px-6 py-4 text-zinc-400">
                {person.countryOrEmpire}
              </td>

              <td className="px-6 py-4 text-zinc-500">
                {person.era}
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

// function parseWealth(value) {
//   if (!value) return 0;

//   let clean = value
//     .replace(/\$/g, "")
//     .replace(/~/g, "")
//     .replace(/,/g, "")
//     .trim();

//   if (clean.toLowerCase().includes("unquantified")) return 0;

//   if (clean.includes("–") || clean.includes("-")) {
//     const parts = clean.split(/–|-/);
//     clean = parts[parts.length - 1];
//   }

//   const num = parseFloat(clean);

//   if (clean.toLowerCase().includes("trillion")) {
//     return num * 1000;
//   }

//   return num;
// }
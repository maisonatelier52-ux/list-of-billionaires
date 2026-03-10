"use client";

import Link from "next/link";
import { useState } from "react";

export default function FictionalTable({ data }) {
  const characters = [...data].sort(
    (a, b) => b.net_worth_billion - a.net_worth_billion
  );

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(characters.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = characters.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      
      {/* TABLE */}
      <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-950">
        <table className="w-full text-sm">

          <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="text-left px-6 py-4">Rank</th>
              <th className="text-left px-6 py-4">Character</th>
              <th className="text-left px-6 py-4">Alias</th>
              <th className="text-left px-6 py-4">Universe</th>
              <th className="text-left px-6 py-4">Occupation</th>
              <th className="text-right px-6 py-4">Net Worth</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((character, index) => (
              <tr
                key={character.slug}
                className="border-t border-zinc-800 hover:bg-zinc-900 transition"
              >

                <td className="px-6 py-4 text-zinc-500 font-medium">
                  #{startIndex + index + 1}
                </td>

                <td className="px-6 py-4 font-semibold text-white">
                  <Link
                    href={`/fictional/${character.slug}`}
                    className="hover:text-violet-400 transition"
                  >
                    {character.name}
                  </Link>
                </td>

                <td className="px-6 py-4 text-violet-400">
                  {character.alias}
                </td>

                <td className="px-6 py-4 text-zinc-400">
                  {character.universe}
                </td>

                <td className="px-6 py-4 text-zinc-400">
                  {character.occupation}
                </td>

                <td className="px-6 py-4 text-right text-emerald-400 font-semibold">
                  ${character.net_worth_billion.toLocaleString()}B
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
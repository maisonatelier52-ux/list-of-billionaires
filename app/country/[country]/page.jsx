import data from "@/data/billionaires.json";
import RankingsTable from "@/app/components/RankingsTable";
import Link from "next/link";
import { notFound } from "next/navigation";
import BillionaireTreemap from "@/app/components/treemap";

function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export default async function CategoryPage({ params }) {
  const { country } = await params;

  const decodedCountry = country.toLowerCase();

  // Detect type
  const filteredData = data.filter((person) => {
    return (
      normalize(person.Country) === decodedCountry
    );
  });

  if (filteredData.length === 0) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white p-6 md:p-12">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Back */}
        <Link
          href="/"
          className="text-zinc-400 hover:text-white transition"
        >
          ← Back to Rankings
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold capitalize">
            {decodedCountry.replace(/-/g, " ")}
          </h1>
          <p className="text-zinc-400 mt-2">
            {filteredData.length} Billionaires Found
          </p>
        </div>

        {/* Show Treemap only if more than 1 billionaire */}
        {filteredData.length > 1 && (
          <div className="min-h-screen bg-black p-10">
            <BillionaireTreemap data={filteredData} />
          </div>
        )}

        {/* Table */}
        <RankingsTable data={filteredData} />

      </div>
    </div>
  );
}
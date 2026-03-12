import data from "@/data/billionaires.json";
import RankingsTable from "@/app/components/RankingsTable";
import Link from "next/link";
import { notFound } from "next/navigation";
import BillionaireTreemap from "@/app/components/treemap";

const SITE_URL = "https://www.list-of-billionaires.com";

export async function generateMetadata({ params }) {
  const { industry } = await params;  

  const decodedIndustry = industry.toLowerCase();
  const industryName = decodedIndustry.replace(/-/g, " ");
  const capitalizedIndustryName = industryName.charAt(0).toUpperCase() + industryName.slice(1);

  const filteredData = data.filter((person) => {
    return (
      normalize(person.Industry) === decodedIndustry
    );
  });

  if (filteredData.length === 0) {
    return {
      title: "Category Not Found",
    };
  }

  const title = `Richest in ${capitalizedIndustryName} | Billionaires`;
  const description = `See the richest ${capitalizedIndustryName} billionaires ranked by net worth. Updated rankings of the world's wealthiest individuals in ${industryName}.`;

  return {
    title,
    description,

    alternates: {
      canonical: `${SITE_URL}/${industry}`,
    },

    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${industry}`,
      siteName: "List of Billionaires",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export default async function CategoryPage({ params }) {
  const { industry } = await params;

  const decodedIndustry = industry.toLowerCase();

  const filteredData = data.filter((person) => {
    return (
      normalize(person.Industry) === decodedIndustry
    );
  });

  if (filteredData.length === 0) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${decodedIndustry.replace(/-/g, " ")} Billionaires`,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: filteredData.length,
    itemListElement: filteredData.slice(0, 100).map((person, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/${normalize(person.Name)}`,
      name: person.Name,
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white p-6 md:p-12">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

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
            {decodedIndustry.replace(/-/g, " ")}
          </h1>
          <p className="text-zinc-400 mt-2">
            {filteredData.length} Billionaires Found
          </p>
        </div>

        <div className="min-h-screen bg-black p-10">
          <BillionaireTreemap data={filteredData} />
        </div>

        {/* Table */}
        <RankingsTable data={filteredData} />

      </div>
    </div>
  );
}
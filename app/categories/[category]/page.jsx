import data from "@/data/billionaires.json";
import RankingsTable from "@/app/components/RankingsTable";
import Link from "next/link";
import { notFound } from "next/navigation";
import BillionaireTreemap from "@/app/components/treemap";

const SITE_URL = "https://www.list-of-billionaires.com";

export async function generateMetadata({ params }) {
  const { category } = await params;

  const decodedCategory = category.toLowerCase();
  const categoryName = decodedCategory.replace(/-/g, " ");
  const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  const filteredData = data.filter((person) => {
    return (
      normalize(person.Industry) === decodedCategory ||
      normalize(person.Country) === decodedCategory ||
      normalize(person.Sex) === decodedCategory
    );
  });

  if (filteredData.length === 0) {
    return {
      title: "Category Not Found",
    };
  }

  const title = `Richest in ${capitalizedCategoryName} | Billionaires`;
  const description = `See the richest ${capitalizedCategoryName} billionaires ranked by net worth. Updated rankings of the world's wealthiest individuals in ${categoryName}.`;

  return {
    title,
    description,

    alternates: {
      canonical: `${SITE_URL}/${category}`,
    },

    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${category}`,
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
  const { category } = await params;

  const decodedCategory = category.toLowerCase();

  // Detect type
  const filteredData = data.filter((person) => {
    return (
      normalize(person.Industry) === decodedCategory ||
      normalize(person.Country) === decodedCategory ||
      normalize(person.Sex) === decodedCategory
    );
  });

  if (filteredData.length === 0) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${decodedCategory.replace(/-/g, " ")} Billionaires`,
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
            {decodedCategory.replace(/-/g, " ")}
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
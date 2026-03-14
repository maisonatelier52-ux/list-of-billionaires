import data from "@/data/billionaires.json";
import RankingsTable from "@/app/components/RankingsTable";
import Link from "next/link";
import { notFound } from "next/navigation";
import BillionaireTreemap from "@/app/components/treemap";
import PhilanthropistTreemap from "@/app/components/PhilanthropistTreemap";
import PhilanthropistsTable from "@/app/components/PhilanthropistsTable";
import PhilanthropyStats from "@/app/components/PhilanthropistStats";

const SITE_URL = "https://www.list-of-billionaires.com";

export async function generateMetadata({ params }) {
  const { category } = await params;

  const decodedCategory = category.toLowerCase();
  const categoryName = decodedCategory.replace(/-/g, " ");
  const capitalizedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  let filteredData;

  if (decodedCategory === "philanthropists") {
    filteredData = data
      .filter((person) => person.Philanthropist === true)
      .sort(
        (a, b) =>
          (b.Total_Donated_USD_Billion || 0) -
          (a.Total_Donated_USD_Billion || 0)
      );
  } else {
    filteredData = data.filter((person) => {
      return (
        normalize(person.Industry) === decodedCategory ||
        normalize(person.Sex) === decodedCategory
      );
    });
  }

  if (filteredData.length === 0) {
    return {
      title: "Category Not Found",
    };
  }

  let title = '';
  let description = '';

  if (decodedCategory === "philanthropists") {
    title = `Top Philanthropists | Billionaires`;
    description = `See the top philanthropists ranked by total donations. Updated rankings of the world's most generous billionaires.`;
  } else {
    title = `Richest in ${capitalizedCategoryName} | Billionaires`;
    description = `See the richest ${capitalizedCategoryName} billionaires ranked by net worth. Updated rankings of the world's wealthiest individuals in ${categoryName}.`;
  }
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
  let filteredData;

  if (decodedCategory === "philanthropists") {
    filteredData = data
      .filter((person) => person.Philanthropist === true)
      .sort(
        (a, b) =>
          (b.Total_Donated_USD_Billion || 0) -
          (a.Total_Donated_USD_Billion || 0)
      );
  } else {
    filteredData = data.filter((person) => {
      return (
        normalize(person.Industry) === decodedCategory ||
        normalize(person.Sex) === decodedCategory
      );
    });
  }

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
            {decodedCategory === "philanthropists"
              ? "Top Philanthropists"
              : decodedCategory.replace(/-/g, " ")}
          </h1>
          <p className="text-zinc-400 mt-2">
            {decodedCategory === "philanthropists"
              ? ``
              : `${filteredData.length} Billionaires Found`
            }
          </p>
        </div>

        <div className="min-h-screen bg-black p-10">
          {decodedCategory === "philanthropists" ? (
            <div className="space-y-10">
            <PhilanthropyStats data={filteredData} />
            <PhilanthropistTreemap data={filteredData} />
            </div>
          ) : (
            <BillionaireTreemap data={filteredData} />
          )}
        </div>

        {/* Table */}
        {decodedCategory === "philanthropists" ? (
            <PhilanthropistsTable data={filteredData} />
          ) : (
            <RankingsTable data={filteredData} />
          )}

      </div>
    </div>
  );
}
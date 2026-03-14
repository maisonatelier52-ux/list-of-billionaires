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
  const capitalizedCategoryName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

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
    filteredData = data.filter(
      (person) =>
        normalize(person.Sex) === decodedCategory
    );
  }

  if (filteredData.length === 0) {
    return {
      title: "Category Not Found | List of Billionaires",
      robots: { index: false, follow: false },
    };
  }

  let title;
  let description;

  if (decodedCategory === "philanthropists") {
    title = `Top Philanthropists in the World (Ranked)`;
    description =
      "Explore the world's top billionaire philanthropists ranked by total donations and charitable impact.";
  } else {
    title = `Richest ${capitalizedCategoryName} Billionaires (Ranked)`;
    description = `Discover the richest ${capitalizedCategoryName} billionaires ranked by net worth. Updated global billionaire rankings.`;
  }

  const url = `${SITE_URL}/categories/${category}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "List of Billionaires",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },

    robots: {
      index: true,
      follow: true,
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
        normalize(person.Sex) === decodedCategory
      );
    });
  }

  if (filteredData.length === 0) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      decodedCategory === "philanthropists"
        ? "Top Philanthropists"
        : `${decodedCategory.replace(/-/g, " ")} Billionaires`,
    url: `${SITE_URL}/categories/${category}`,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: filteredData.length,
      itemListElement: filteredData.slice(0, 100).map((person, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Person",
          name: person.Name,
          url: `${SITE_URL}/billionaire/${normalize(person.Name)}`,
        },
      })),
    },
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
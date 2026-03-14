import data from "@/data/billionaires.json";
import RankingsTable from "@/app/components/RankingsTable";
import Link from "next/link";
import { notFound } from "next/navigation";
import BillionaireTreemap from "@/app/components/treemap";

const SITE_URL = "https://www.list-of-billionaires.com";

function normalize(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export async function generateMetadata({ params }) {
  const { continent } = await params;

  const decodedContinent = continent.toLowerCase().replace(/-/g, " ");
  const capitalizedContinent = decodedContinent.charAt(0).toUpperCase() + decodedContinent.slice(1);

  const filteredData = data.filter((person) => {
    return normalize(person.Continent) === continent.toLowerCase();
  });

  if (filteredData.length === 0) {
    return {
      title: "Continent Not Found",
    };
  }

  const title = `Richest Billionaires in ${capitalizedContinent} | Top Wealth`;
  const description = `Explore the ${filteredData.length} richest billionaires in ${capitalizedContinent}. Rankings, net worth, and profiles of the wealthiest individuals.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/region/${continent}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/region/${continent}`,
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

export default async function CategoryPage({ params }) {
  const { continent } = await params;

  const decodedCategory = continent.toLowerCase();

  const filteredData = data.filter((person) => {
    return (
      normalize(person.Continent) === decodedCategory
    );
  });

  if (filteredData.length === 0) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Billionaires in ${formatName(continent)}`,
    url: `${SITE_URL}/region/${continent}`,
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
          url: `${SITE_URL}/${normalize(person.Name)}`,
        },
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Regions",
        item: `${SITE_URL}/region`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: formatName(continent),
        item: `${SITE_URL}/region/${continent}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white p-6 md:p-12">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
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
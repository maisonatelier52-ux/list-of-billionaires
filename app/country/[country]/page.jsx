import data from "@/data/billionaires.json";
import RankingsTable from "@/app/components/RankingsTable";
import Link from "next/link";
import { notFound } from "next/navigation";
import BillionaireTreemap from "@/app/components/treemap";

const SITE_URL = "https://www.list-of-billionaires.com";

function normalize(str) {
  return str?.toLowerCase().replace(/\s+/g, "-");
}

function formatName(str) {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export async function generateMetadata({ params }) {
  const { country } = await params;

  const decodedCountry = country.toLowerCase();
  const countryName = formatName(decodedCountry);

  const filteredData = data.filter(
    (person) => normalize(person.Country) === decodedCountry
  );

  if (filteredData.length === 0) {
    return {
      title: "Country Not Found | List of Billionaires",
      robots: { index: false, follow: false },
    };
  }

  const title = `Richest Billionaires in ${countryName} (Ranked)`;
  const description = `Discover the ${filteredData.length} richest billionaires in ${countryName}. Explore rankings, net worth, and profiles of the wealthiest individuals.`;

  const url = `${SITE_URL}/country/${country}`;

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Billionaires in ${formatName(country)}`,
    url: `${SITE_URL}/country/${country}`,
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
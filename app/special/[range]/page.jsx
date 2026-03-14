import data from "@/data/billionaires.json";
import RankingsTable from "@/app/components/RankingsTable";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

const SITE_URL = "https://www.list-of-billionaires.com";

export async function generateMetadata({ params }) {
  const { range } = await params;

  let title = "";
  let description = "";

  if (range === "wealth-range-100b-plus") {
    title = "Elite Billionaires with Net Worth 100+ Billion | List of Billionaires";
    description = "Explore the elite list of billionaires with a net worth of 100 billion dollars or more. Rankings and profiles of the world's richest individuals.";
  } else if (range === "wealth-range-40-100b") {
    title = "Billionaires with Net Worth 40 to 100 Billion | List of Billionaires";
    description = "Discover billionaires with a net worth between 40 and 100 billion dollars. Detailed rankings and wealth data.";
  } else if (range === "wealth-range-1-40b") {
    title = "Billionaires with Net Worth Under 40 Billion | List of Billionaires";
    description = "See the list of billionaires with a net worth under 40 billion dollars. Comprehensive profiles and rankings.";
  } else {
    return {
      title: "Page Not Found | List of Billionaires",
    };
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/special/${range}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/special/${range}`,
      siteName: "List of Billionaires",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Billionaires by Wealth Range",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default async function SpecialPage({ params }) {
  const { range } = await params;

  let filteredData;
  let pageTitle = "";
  let pageDescription = "";

  if (range === "wealth-range-100b-plus") {
    filteredData = data.filter((p) => p.Net_Worth_USD_Billion >= 100);
    pageTitle = "Elite Billionaires with Net Worth 100+ Billion";
    pageDescription = "Explore the elite list of billionaires with a net worth of 100 billion dollars or more.";
  } else if (range === "wealth-range-40-100b") {
    filteredData = data.filter((p) => p.Net_Worth_USD_Billion >= 40 && p.Net_Worth_USD_Billion < 100);
    pageTitle = "Billionaires with Net Worth 40 to 100 Billion";
    pageDescription = "Discover billionaires with a net worth between 40 and 100 billion dollars.";
  } else if (range === "wealth-range-1-40b") {
    filteredData = data.filter((p) => p.Net_Worth_USD_Billion < 40);
    pageTitle = "Billionaires with Net Worth Under 40 Billion";
    pageDescription = "See the list of billionaires with a net worth under 40 billion dollars.";
  } else {
    notFound();
  }

  filteredData.sort((a, b) => b.Net_Worth_USD_Billion - a.Net_Worth_USD_Billion);

  const richest = filteredData[0];

  const totalWealth = filteredData.reduce(
    (sum, p) => sum + p.Net_Worth_USD_Billion,
    0
  );

  const countries = new Set(filteredData.map((p) => p.Country)).size;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: pageTitle,
            description: pageDescription,
            url: `${SITE_URL}/special/${range}`,
            numberOfItems: filteredData.length,
            itemListElement: filteredData.slice(0, 10).map((person, index) => ({
              "@type": "Person",
              position: index + 1,
              name: person.Name,
              netWorth: {
                "@type": "MonetaryAmount",
                currency: "USD",
                value: person.Net_Worth_USD_Billion,
              },
              nationality: person.Country,
            })),
          }),
        }}
      />

      <div className="container mx-auto px-4 py-10">

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">{pageTitle}</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">{pageDescription}</p>
        </div>

        {/* Wealth Range Navigation */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          <Link href="/special/wealth-range-100b-plus" className="px-4 py-2 bg-zinc-900 rounded-lg hover:bg-zinc-800">
            $100B+
          </Link>
          <Link href="/special/wealth-range-40-100b" className="px-4 py-2 bg-zinc-900 rounded-lg hover:bg-zinc-800">
            $40B–$100B
          </Link>
          <Link href="/special/wealth-range-1-40b" className="px-4 py-2 bg-zinc-900 rounded-lg hover:bg-zinc-800">
            Under $40B
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

          <div className="bg-zinc-900 p-5 rounded-xl text-center">
            <p className="text-zinc-400 text-sm">Total Billionaires</p>
            <p className="text-2xl font-bold">{filteredData.length}</p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl text-center">
            <p className="text-zinc-400 text-sm">Total Wealth</p>
            <p className="text-2xl font-bold">${totalWealth.toLocaleString()}B</p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl text-center">
            <p className="text-zinc-400 text-sm">Countries</p>
            <p className="text-2xl font-bold">{countries}</p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl text-center">
            <p className="text-zinc-400 text-sm">Richest</p>
            <p className="text-lg font-semibold">{richest.Name}</p>
          </div>

        </div>

        {/* Highlight Richest */}
        <div className="bg-zinc-900 p-6 rounded-2xl mb-10 border border-zinc-800">
            <h2 className="text-lg font-semibold mb-4 text-white">
                Richest in this category
            </h2>

            <div className="flex items-start justify-between gap-6">

                {/* Left Content */}
                <div className="flex-1">

                    <h3 className="text-2xl font-bold text-white">
                        {richest.Name}
                    </h3>

                    <p className="text-green-400 font-semibold text-lg">
                        ${richest.Net_Worth_USD_Billion.toLocaleString()} Billion
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-sm text-zinc-300 mt-3">
                        <span>Country: {richest.Country}</span>
                        <span>City: {richest.City}</span>
                        <span>Industry: {richest.Industry}</span>
                        <span>Age: {richest.Age}</span>
                    </div>

                    <p className="text-zinc-300 mt-3 text-sm">
                        Source of wealth: {richest.Source_of_Wealth}
                    </p>

                    <p className="text-zinc-400 mt-4 text-sm leading-relaxed">
                        {richest.about}
                    </p>

                    <a
                        href={`/${richest.slug}`}
                        className="inline-block mt-4 text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition"
                    >
                        View Full Profile
                    </a>

                </div>

                {/* Right Image */}
                <div className="flex-shrink-0 px-5">
                <Image
                    src={richest.image}
                    alt={richest.Name}
                    width={150}
                    height={120}
                    className="border-2 border-zinc-700"
                    priority
                />
                </div>

            </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <RankingsTable data={filteredData} />
        </div>

      </div>
    </div>
  );
}
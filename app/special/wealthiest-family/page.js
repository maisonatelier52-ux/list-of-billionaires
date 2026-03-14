import Image from "next/image";
import data from "@/data/wealthiest_families.json";
import ReactCountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

const SITE_URL = "https://www.list-of-billionaires.com";

function getCountryCode(countryName) {
  return countries.getAlpha2Code(countryName, "en");
}

export const metadata = {
  title: "Top 25 Wealthiest Families in the World | Richest Family Fortunes",
  description: "Explore the wealthiest families globally. Rankings of the top 25 richest family dynasties with combined wealth, industries, and sources of fortune.",
  keywords: [
    "wealthiest families",
    "richest family dynasties",
    "family fortunes",
    "billionaire families",
    "top families wealth"
  ],
  alternates: {
    canonical: `${SITE_URL}/special/wealthiest-family`,
  },
  openGraph: {
    title: "Top 25 Wealthiest Families in the World",
    description: "Discover the richest family dynasties and their massive fortunes.",
    url: `${SITE_URL}/special/wealthiest-family`,
    siteName: "List of Billionaires",
    images: [
      {
        url: `${SITE_URL}/family/family-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Wealthiest Families",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 25 Wealthiest Families in the World",
    description: "Rankings of the richest family fortunes globally.",
    images: [`${SITE_URL}/family/family-banner.jpg`],
  },
};

export default function WealthiestFamiliesPage() {

  const families = data.wealthiest_families;

  const totalWealth = families.reduce(
    (sum, f) => sum + f.estimated_wealth_usd_billion,
    0
  );

  const richest = families[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top 25 Wealthiest Families in the World",
    description: "Ranking of the wealthiest family dynasties by combined net worth.",
    url: `${SITE_URL}/special/wealthiest-family`,
    numberOfItems: families.length,
    itemListElement: families.map((family, index) => ({
      "@type": "Organization",
      position: index + 1,
      name: family.family,
      description: `Family dynasty with estimated wealth of $${family.estimated_wealth_usd_billion} billion from ${family.industry}.`,
      foundingLocation: {
        "@type": "Country",
        name: family.country,
      },
    })),
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 text-white">

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-3">
          Top 25 Wealthiest Families in the World
        </h1>

        <p className="text-zinc-400 max-w-3xl">
          These families control some of the largest business empires in
          history. Their wealth spans industries such as retail, energy,
          luxury fashion, technology, and global investments.
        </p>
      </section>

      {/* Summary Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-zinc-400 text-sm">Families Listed</p>
          <p className="text-2xl font-bold mt-1">
            {families.length}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-zinc-400 text-sm">Combined Wealth</p>
          <p className="text-2xl font-bold text-green-400 mt-1">
            ${totalWealth.toLocaleString()}B
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-zinc-400 text-sm">Richest Family</p>
          <p className="text-lg font-semibold mt-1">
            {richest.family}
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
          <p className="text-zinc-400 text-sm">Top Industry</p>
          <p className="text-lg font-semibold mt-1">
            Retail
          </p>
        </div>

      </section>

      {/* Table */}
      <div className="overflow-x-auto px-4">

        <table className="w-full border border-zinc-800 rounded-xl overflow-hidden">

          <thead className="bg-zinc-900 text-zinc-300 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Family</th>
              <th className="px-4 py-3 text-left">Country</th>
              <th className="px-4 py-3 text-left">Industry</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left">Wealth</th>
            </tr>
          </thead>

          <tbody>

            {families.map((family) => (

              <tr
                key={family.slug}
                className="border-t border-zinc-800 hover:bg-zinc-900 transition"
              >

                <td className="px-4 py-4">
                  #{family.rank}
                </td>

                {/* Family Name */}
                <td className="px-4 py-4">

                  <div className="flex items-center gap-3">

                    <a
                      href={`/special/wealthiest-family/${family.slug}`}
                      className="font-semibold hover:underline"
                    >
                      {family.family}
                    </a>

                  </div>

                </td>

                <td className="px-4 py-4 text-zinc-400">
                  <span className="flex items-center gap-2">
                    <ReactCountryFlag
                        countryCode={getCountryCode(family.country)}
                        svg
                        style={{ width: "20px", height: "15px" }}
                    />
                    {family.country}
                  </span>
                </td>

                <td className="px-4 py-4 text-zinc-400">
                  {family.industry}
                </td>

                <td className="px-4 py-4 text-zinc-400">
                  {family.source_of_wealth}
                </td>

                <td className="px-4 py-4 text-green-400 font-semibold">
                  ${family.estimated_wealth_usd_billion}B
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}
import Hero from "./components/Hero";
import ArticleCard from "./components/ArticleCard";
import RankingsTable from "./components/RankingsTable";
import billionaires from "../data/billionaires.json";
import Intro from "./components/Intro";

const SITE_URL = "https://www.list-of-billionaires.com";

export const metadata = {
  title: "World's Billionaires List 2026 | Richest People in the World",
  description:
    "Explore the complete 2026 list of the world's richest billionaires. Discover rankings, net worth, industries, and countries of the wealthiest people on Earth.",
  keywords: [
    "world billionaires list",
    "richest people in the world",
    "billionaire rankings",
    "top billionaires 2026",
    "net worth billionaires"
  ],
  openGraph: {
    title: "World's Billionaires List 2026",
    description:
      "Discover the richest billionaires in the world with rankings, wealth data, and profiles.",
    url: SITE_URL,
    siteName: "List of Billionaires",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "World's Billionaires List",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "World's Billionaires List 2026",
    description:
      "Explore the richest billionaires in the world with rankings and wealth insights.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const sampleArticles = [
  {
    title:
      "Bill Ackman in Special Interview: “Evil Fears Strong Leadership – and We Are Going to Get Particularly Strong Leadership”",
    href: "#",
    image: "/billionaires/julio.webp",
    description:
      "In a candid conversation, billionaire investor Bill Ackman shares his insights on leadership and the future economy.",
  },
  {
    title:
      "Jerry Seinfeld: The Comedian Who Became a Leading Voice Against Antisemitism",
    href: "#",
    image: "/billionaires/julio.webp",
    description:
      "Jerry Seinfeld has emerged as a strong advocate against antisemitism, using his global influence to promote tolerance.",
  },
  {
    title:
      "Miriam Adelson: The Wealthiest Israeli Woman and One of the World's Richest Women",
    href: "#",
    image: "/billionaires/julio.webp",
    description:
      "Miriam Adelson, widow of Sheldon Adelson, is one of the richest women in the world.",
  },
];

export default function Home() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "World's Billionaires List 2026",
    description:
      "Explore the richest billionaires in the world with rankings, net worth, industries and profiles.",
    url: SITE_URL,
    mainEntity: {
      "@type": "ItemList",
      name: "World Billionaires Rankings",
      itemListElement: billionaires.slice(0, 10).map((person, index) => ({
        "@type": "Person",
        position: index + 1,
        name: person.Name,
        nationality: person.Country,
        netWorth: {
          "@type": "MonetaryAmount",
          currency: "USD",
          value: person.Net_Worth_USD_Billion,
        },
      })),
    },
  };

  return (
    <div className="font-sans text-gray-900 text-white">

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <Intro />

      <main className="max-w-6xl mx-auto px-4 py-12">

        <section className="grid gap-6 md:grid-cols-3">
          {sampleArticles.map((a, idx) => (
            <ArticleCard key={idx} {...a} />
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            2026 World’s Billionaires
          </h2>

          <RankingsTable data={billionaires} />
        </section>

      </main>
    </div>
  );
}
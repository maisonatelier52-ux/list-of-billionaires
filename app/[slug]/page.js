import data from "@/data/billionaires.json";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

const SITE_URL = "https://www.list-of-billionaires.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const person = data.find((p) => createSlug(p.Name) === slug);

  if (!person) {
    return {
      title: "Billionaire Not Found",
    };
  }

  const title = `${person.Name} Net Worth (${person.Net_Worth_USD_Billion}B) | Rank #${person.Rank}`;
  const description = `${person.Name} is ranked #${person.Rank} among the world's richest billionaires with a net worth of $${person.Net_Worth_USD_Billion} billion. Industry: ${person.Industry}. Country: ${person.Country}.`;

  return {
    title,
    description,

    alternates: {
      canonical: `${SITE_URL}/${slug}`,
    },

    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${slug}`,
      siteName: "List of Billionaires",
      images: [
        {
          url: person.image,
          width: 1200,
          height: 630,
          alt: person.Name,
        },
      ],
      type: "profile",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [person.image],
    },
  };
}

countries.registerLocale(enLocale);

function getCountryCode(countryName) {
  return countries.getAlpha2Code(countryName, "en");
}

function createSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default async function PersonPage({ params }) {
  const { slug } = await params;

  const person = data.find(
    (p) => createSlug(p.Name) === slug
  );

  if (!person) return notFound();

  const maxWealth = 841.1;
  const wealthPercent = (person.Net_Worth_USD_Billion / maxWealth) * 100;

  const related = data
  .filter(
    (p) =>
      p.Industry?.trim().toLowerCase() ===
        person.Industry?.trim().toLowerCase() &&
      p.Name !== person.Name
  )
  .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.Name,
    image: person.image,
    jobTitle: "Businessperson",
    nationality: person.Country,
    address: {
      "@type": "PostalAddress",
      addressLocality: person.City,
      addressCountry: person.Country,
    },
    description: `${person.Name} is ranked #${person.Rank} among the world's richest billionaires with a net worth of $${person.Net_Worth_USD_Billion} billion.`,
    url: `${SITE_URL}/${slug}`,
    knowsAbout: person.Industry,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white p-6 md:p-12">
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />

      {/* Back */}
      <Link
        href="/"
        className="text-zinc-400 hover:text-white transition"
      >
        ← Back to Rankings
      </Link>

      <div className="max-w-6xl mx-auto mt-8">

        {/* Hero Section */}
        <div className="grid md:grid-cols-3 gap-10 items-center">

          {/* Image */}
          <div className="relative w-full h-96 overflow-hidden shadow-2xl border border-zinc-800">
            <Image
              src={person.image}
              alt={person.Name}
              fill
              className="object-cover"
            />
          </div>

          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">

            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                #{person.Rank} {person.Name}
              </h1>
              <p className="text-zinc-400 mt-2 flex items-center gap-2">
                {person.Industry} •

                <span className="flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode={getCountryCode(person.Country)}
                    svg
                    style={{ width: "20px", height: "15px" }}
                  />
                  {person.Country}
                </span>
              </p>
            </div>

            {/* Wealth */}
            <div>
              <p className="text-3xl font-semibold text-green-400">
                ${person.Net_Worth_USD_Billion.toLocaleString()} Billion
              </p>

              <div className="mt-4 w-full bg-zinc-800 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${wealthPercent}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Compared to richest billionaire
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              {person.Rank <= 10 && (
                <Badge text="Top 10 Billionaire" />
              )}
              {person.Net_Worth_USD_Billion >= 100 && (
                <Badge text="Centibillionaire" />
              )}
              <Badge text={person.Sex} />
            </div>

          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <InfoCard label="Age" value={person.Age} />
          <InfoCard
            label="City / Country"
            value={
              <span className="flex items-center gap-2">
                {person.City},
                <ReactCountryFlag
                  countryCode={getCountryCode(person.Country)}
                  svg
                  style={{ width: "20px", height: "15px" }}
                />
                {person.Country}
              </span>
            }
          />
          <InfoCard label="Source of Wealth" value={person.Source_of_Wealth} />
          <InfoCard label="Marital Status" value={person.Marital_Status} />
          <InfoCard label="Children" value={person.Children} />
          <InfoCard label="Industry" value={person.Industry} />

        </div>

        {/* Related Section */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              More from {person.Industry}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.Rank}
                  href={`/${r.slug}`}
                  className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-800 transition group"
                >
                  {/* Left Content */}
                  <div>
                    <p className="font-semibold text-white">
                      #{r.Rank} {r.Name}
                    </p>
                    <p className="text-sm text-zinc-400 mt-2">
                      ${r.Net_Worth_USD_Billion}B
                    </p>
                  </div>

                  {/* Right Image */}
                  <div className="w-16 h-16 relative shrink-0">
                    <img
                      src={r.image}
                      alt={r.Name}
                      className="w-16 h-16 object-cover rounded-full border-2 border-zinc-700 group-hover:border-white transition"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* Components */

function InfoCard({ label, value }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
        {label}
      </p>
      <p className="text-lg font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

function Badge({ text }) {
  return (
    <span className="px-4 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-full">
      {text}
    </span>
  );
}
import data from "@/data/wealthiest_families.json";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

const SITE_URL = "https://www.list-of-billionaires.com";

function getCountryCode(countryName) {
  return countries.getAlpha2Code(countryName, "en");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const families = data.wealthiest_families;
  const family = families.find((f) => f.slug === slug);

  if (!family) {
    return {
      title: "Family Not Found",
    };
  }

  const title = `${family.family} Family Net Worth | Richest Family Dynasty`;
  const description = `${family.family} is one of the wealthiest family dynasties with an estimated net worth of $${family.estimated_wealth_usd_billion} billion. Industry: ${family.industry}. Country: ${family.country}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/special/wealthiest-family/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/special/wealthiest-family/${slug}`,
      siteName: "List of Billionaires",
      images: [
        {
          url: `${SITE_URL}/family/${family.image_banner}`,
          width: 1200,
          height: 630,
          alt: family.family,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/family/${family.image_banner}`],
    },
  };
}

export default async function FamilyPage({ params }) {
  const { slug } = await params;

  const families = data.wealthiest_families;

  const family = families.find((f) => f.slug === slug);

  if (!family) return notFound();

  const maxWealth = 513;
  const wealthPercent =
    (family.estimated_wealth_usd_billion / maxWealth) * 100;

  const related = families
    .filter(
      (f) =>
        f.industry?.toLowerCase() === family.industry?.toLowerCase() &&
        f.slug !== family.slug
    )
    .slice(0, 3);
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: family.family,
    url: `${SITE_URL}/special/wealthiest-family/${family.slug}`,
    logo: `${SITE_URL}/family/${family.image}`,
    description: `${family.family} is one of the richest family dynasties with an estimated net worth of $${family.estimated_wealth_usd_billion} billion.`,
    foundingDate: family.founded_year,
    founder: {
      "@type": "Person",
      name: family.founded_by,
    },
    location: {
      "@type": "Country",
      name: family.country,
    },
    industry: family.industry,
    netWorth: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: family.estimated_wealth_usd_billion * 1000000000,
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
        name: "Special Rankings",
        item: `${SITE_URL}/special`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Wealthiest Families",
        item: `${SITE_URL}/special/wealthiest-family`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: family.family,
        item: `${SITE_URL}/special/wealthiest-family/${family.slug}`,
      },
    ],
  };

  return (
    <main className="bg-black text-gray-200 min-h-screen">

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd),
        }}
      />

      {/* HERO IMAGE */}
      <div className="w-full h-[500px] relative overflow-hidden">
        <Image
          src={`/family/${family.image_banner}`}
          alt={family.family}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 md:flex md:gap-12">

        {/* LEFT IMAGE */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="sticky top-28 w-64 h-80 rounded-2xl overflow-hidden shadow-lg -mt-32 border border-zinc-800">

            <Image
              src={`/family/${family.image}`}
              alt={family.family}
              fill
              className="object-cover"
            />

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:w-2/3 space-y-4 -mt-32 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">

          {/* NAME */}
          <h1 className="text-5xl font-bold">
            #{family.rank} {family.family}
          </h1>

          {/* INDUSTRY + COUNTRY */}
          <p className="text-zinc-300 flex items-center gap-2">

            {family.industry} •

            <span className="flex items-center gap-2">

              <ReactCountryFlag
                countryCode={getCountryCode(family.country)}
                svg
                style={{ width: "20px", height: "15px" }}
              />

              {family.country}

            </span>

          </p>

          {/* Wealth */}
          <div>
            <p className="text-3xl font-semibold text-green-400">
              ${family.estimated_wealth_usd_billion.toLocaleString()} Billion
            </p>

            <div className="mt-4 w-full bg-zinc-800 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-700"
                style={{ width: `${wealthPercent}%` }}
              />
            </div>

            <p className="text-xs text-zinc-500 mt-2">
              Compared to richest family
            </p>
          </div>

          {/* DETAILS */}
          <div className="mt-6 space-y-1 text-zinc-300 text-sm">

            <p>
              <span className="font-semibold text-white">Source of Wealth:</span>{" "}
              {family.source_of_wealth}
            </p>

            <p>
              <span className="font-semibold text-white">Industry:</span>{" "}
              {family.industry}
            </p>

            <p>
              <span className="font-semibold text-white">Founded By:</span>{" "}
              {family.founded_by}
            </p>

            <p>
              <span className="font-semibold text-white">Founded Year:</span>{" "}
              {family.founded_year}
            </p>

            <p>
              <span className="font-semibold text-white">Continent:</span>{" "}
              {family.continent}
            </p>

          </div>

        </div>
      </div>

      {/* RELATED SECTION */}
      {related.length > 0 && (

        <section className="mt-24 max-w-6xl px-6 mx-auto pb-10">

          <h2 className="text-3xl font-bold text-center text-white mb-6">
            More from {family.industry}
          </h2>

          <div className="flex justify-center gap-8 flex-wrap">

            {related.map((r) => (

              <Link
                key={r.slug}
                href={`/special/wealthiest-family/${r.slug}`}
                className="relative group w-64 h-80 overflow-hidden rounded-2xl border border-zinc-800 shadow-lg"
              >

                <Image
                  src={`/family/${r.slug}.jpg`}
                  alt={r.family}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/80 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 p-4 flex flex-col justify-center">

                  <h3 className="text-white text-xl font-bold mb-2">
                    #{r.rank} {r.family}
                  </h3>

                  <p className="text-zinc-300 text-sm">
                    <span className="font-semibold">Country:</span>{" "}
                    {r.country}
                  </p>

                  <p className="text-zinc-300 text-sm py-1">
                    <span className="font-semibold">Wealth:</span>{" "}
                    <span className="text-green-500 font-semibold">
                      ${r.estimated_wealth_usd_billion}B
                    </span>
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </section>

      )}

    </main>
  );
}
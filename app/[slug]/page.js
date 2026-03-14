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

  return (
    <main className="bg-black text-gray-200 min-h-screen">

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.Name,
            description: `${person.Name} is a billionaire with a net worth of $${person.Net_Worth_USD_Billion} billion, ranked #${person.Rank} globally.`,
            image: person.image,
            nationality: person.Country,
            jobTitle: person.Industry,
            knowsAbout: person.Source_of_Wealth,
            address: {
              "@type": "PostalAddress",
              addressCountry: person.Country,
              addressLocality: person.City,
            },
            sameAs: person.wikipedia_url || undefined,
          }),
        }}
      />

      {/* HERO IMAGE */}
      <div className="w-full h-[500px] relative overflow-hidden">
        <Image
          src={person.image_banner}
          alt={person.Name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 md:flex md:gap-12">

        {/* LEFT STICKY IMAGE */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="sticky top-28 w-64 h-96 md:h-[400px] rounded-2xl overflow-hidden shadow-lg -mt-32 border border-zinc-800">
            <Image
              src={person.image}
              alt={person.Name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:w-2/3 space-y-4 -mt-32 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">

          {/* NAME */}
          <h1 className="text-5xl font-bold">
            #{person.Rank} {person.Name}
          </h1>

          {/* INDUSTRY + COUNTRY */}
          <p className="text-zinc-300 flex items-center gap-2">
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

          {/* Wealth */}
          <div>
            <p className="text-3xl font-semibold text-green-400">
              ${person.Net_Worth_USD_Billion.toLocaleString()} Billion
            </p>
            <div className="mt-4 w-full bg-zinc-800 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full transition-all duration-700" style={{ width: `${wealthPercent}%` }} />
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Compared to richest billionaire
            </p>
          </div>

          {/* DETAILS */}
          <div className="mt-6 space-y-1 text-zinc-300 text-sm">
            <p><span className="font-semibold text-white">Age:</span> {person.Age}</p>
            <p><span className="font-semibold text-white">City:</span> {person.City}</p>
            <p><span className="font-semibold text-white">Source of Wealth:</span> {person.Source_of_Wealth}</p>
            <p><span className="font-semibold text-white">Industry:</span> {person.Industry}</p>
            <p><span className="font-semibold text-white">Marital Status:</span> {person.Marital_Status}</p>
            <p><span className="font-semibold text-white">Children:</span> {person.Children}</p>
          </div>

          {/* BADGES */}
          <div className="flex flex-wrap gap-3 mt-6">
            {person.Rank <= 10 && <Badge text="Top 10 Billionaire" />}
            {person.Net_Worth_USD_Billion >= 100 && <Badge text="Centibillionaire" />}
            <Badge text={person.Sex} />
            <Badge text={person.Continent} />
          </div>

          {/* ABOUT */}
          {person.about && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-white mb-3">
                About {person.Name}
              </h2>
              <p className="text-zinc-300 leading-relaxed text-[15px]">
                {person.about}
              </p>
            </div>
          )}

        </div>
      </div>

      {/* RELATED SECTION */}
      {related.length > 0 && (
        <section className="mt-24 max-w-6xl px-6 mx-auto pb-10">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            More from {person.Industry}
          </h2>

          <div className="flex justify-center gap-8">
            {related.map((r) => (
              <Link
                key={r.Rank}
                href={`/${createSlug(r.Name)}`}
                className="relative group w-64 h-80 overflow-hidden rounded-2xl border border-zinc-800 shadow-lg"
              >

                <Image
                  src={r.image}
                  alt={r.Name}
                  fill
                  className="object-cover"
                />
                {/* Overlay Details Panel */}
                <div className="absolute inset-0 bg-black/80 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 p-4 flex flex-col justify-center">
                  <h3 className="text-white text-xl font-bold mb-2">
                    #{r.Rank} {r.Name}
                  </h3>
                  <p className="text-zinc-300 text-sm"><span className="font-semibold">Age:</span> {r.Age}</p>
                  <p className="text-zinc-300 text-sm space-x-2">
                    <span className="font-semibold">
                      Country:
                    </span>
                    <span className="flex items-center gap-2">
                      <ReactCountryFlag
                        countryCode={getCountryCode(r.Country)}
                        svg
                        style={{ width: "20px", height: "15px" }}
                      />
                      {r.Country}
                    </span>
                  </p>
                  <p className="text-zinc-300 text-sm py-1"><span className="font-semibold">Net Worth:</span> <span className="text-green-500 font-semibold bg-green-500/20 border border-green-500 rounded-full px-2 py-0.5">${r.Net_Worth_USD_Billion} B</span></p>
                </div>

              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}

function Badge({ text }) {
  return (
    <span className="px-4 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-full">
      {text}
    </span>
  );
}
import data from "@/data/fictional-characters.json";
import Image from "next/image";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return data.map((character) => ({
    slug: character.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const character = data.find((c) => c.slug === slug);

  if (!character) return {};

  return {
    title: `${character.name} Net Worth | Fictional Characters`,
    description: `Estimated net worth, background and details about ${character.name} (${character.alias}) from the ${character.universe} universe.`,
  };
}

export default async function CharacterPage({ params }) {
  const { slug } = await params;
  const character = data.find((c) => c.slug === slug);

  if (!character) return notFound();

  return (
    <main className="bg-black text-gray-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-16">

        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Character Image */}
          <div className="relative w-full h-[440px] shadow-2xl rounded-2xl overflow-hidden border border-zinc-800">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Basic Info */}
          <div className="space-y-6">

            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {character.name}
            </h1>

            {character.alias && (
              <p className="text-xl text-violet-400 italic">
                "{character.alias}"
              </p>
            )}

            <p className="text-zinc-300 leading-relaxed">
              {character.description}
            </p>

            {/* Net Worth */}
            <div className="mt-4">
              <p className="text-lg text-zinc-400">Estimated Net Worth</p>
              <p className="text-3xl font-bold text-green-400">
                ${character.net_worth_billion} Billion
              </p>
            </div>

          </div>
        </div>

        {/* INFO CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mt-14">

          <InfoCard label="Universe" value={character.universe} />
          <InfoCard label="Occupation" value={character.occupation} />
          <InfoCard label="Created By" value={character.created_by} />
          <InfoCard label="First Appearance" value={character.first_appearance} />
          <InfoCard label="Source of Wealth" value={character.source} />

        </div>

        {/* ORIGIN / BACKSTORY */}
        {character.origin && (
          <section className="mt-16 max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              Character Origin
            </h2>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-300 leading-relaxed">
              {character.origin}
            </div>
          </section>
        )}

        {/* QUOTES */}
        {character.quotes && character.quotes.length > 0 && (
          <section className="mt-16">

            <h2 className="text-2xl font-bold text-white mb-6">
              Famous Quotes
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {character.quotes.map((quote, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800 transition"
                >
                  <p className="text-lg italic text-zinc-300">
                    “{quote}”
                  </p>

                  <p className="text-sm text-zinc-500 mt-3">
                    — {character.name}
                  </p>
                </div>
              ))}

            </div>
          </section>
        )}

      </div>
    </main>
  );
}

/* Components */

function InfoCard({ label, value }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
        {label}
      </p>
      <p className="text-lg font-semibold text-white">
        {value}
      </p>
    </div>
  );
}
import data from "@/data/fictional-characters.json";
import Image from "next/image";
import Link from "next/link";
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

  const related = data.filter(c => c.slug !== slug).slice(0, 4);

  return (
    <main className="bg-black text-gray-200 min-h-screen">

        {/* HERO IMAGE BLENDING INTO BLACK */}
        <div className="w-full h-[500px] relative mb-20 overflow-hidden">
          <Image
            src={character.image_banner}
            alt={character.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black"></div>
        </div>

        {/* LEFT SMALL IMAGE + RIGHT DETAILS */}
        <div className="max-w-6xl mx-auto px-6 md:flex md:gap-12">

          {/* LEFT: Sticky Small Image overlapping hero */}
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="sticky top-28 w-64 h-96 md:h-[400px] rounded-2xl overflow-hidden shadow-lg -mt-32 border border-zinc-800">
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT: Character Details overlapping hero */}
          <div className="space-y-4 -mt-32 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
            <h1 className="text-5xl font-bold">{character.name}</h1>
            {character.alias && (
              <p className="text-2xl text-violet-400 italic">"{character.alias}"</p>
            )}
            <p className="text-lg text-zinc-300 leading-relaxed">{character.description}</p>

            {/* Net Worth */}
            <div className="mt-4">
              <span className="px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 text-sm rounded-full">
                Net Worth: ${character.net_worth_billion} Billion
              </span>
            </div>

            {/* Additional Info */}
            <div className="mt-6 space-y-1 text-zinc-300 text-sm">
              <p><span className="font-semibold text-white">Universe:</span> {character.universe}</p>
              <p><span className="font-semibold text-white">Occupation:</span> {character.occupation}</p>
              <p><span className="font-semibold text-white">Created By:</span> {character.created_by}</p>
              <p><span className="font-semibold text-white">First Appearance:</span> {character.first_appearance}</p>
              <p><span className="font-semibold text-white">Source of Wealth:</span> {character.source}</p>
            </div>

            {/* Origin / Backstory */}
            {character.origin && (
              <section className="mt-8">
                <h2 className="text-3xl font-bold text-white mb-4">Character Origin</h2>
                <p className="text-lg text-zinc-300 leading-relaxed">{character.origin}</p>
              </section>
            )}

            {/* Quotes */}
            {character.quotes && character.quotes.length > 0 && (
              <section className="mt-12">
                <h2 className="text-3xl font-bold text-white mb-4">Famous Quotes</h2>
                <div className="space-y-4">
                  {character.quotes.map((quote, i) => (
                    <p key={i} className="text-lg italic text-zinc-300">“{quote}”</p>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>

        {/* RELATED SECTION */}
        {related.length > 0 && (
          <section className="mt-24 max-w-6xl px-6 mx-auto pb-10">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Related Characters</h2>

            <div className="flex justify-center gap-8"> {/* Center 3 items */}
              {related.slice(0, 3).map((c) => (
                <Link key={c.slug} href={`/fictional/${c.slug}`} className="relative group w-64 h-80 overflow-hidden rounded-2xl border border-zinc-800 shadow-lg">
                  <div key={c.slug} className="relative group w-64 h-80 overflow-hidden rounded-2xl border border-zinc-800 shadow-lg">

                    {/* Character Image */}
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover"
                    />

                    {/* Overlay Details Panel */}
                    <div className="absolute inset-0 bg-black/80 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 p-4 flex flex-col justify-center">
                      <h3 className="text-white text-xl font-bold mb-2">{c.name}</h3>
                      <p className="text-zinc-300 text-sm"><span className="font-semibold">Universe:</span> {c.universe}</p>
                      <p className="text-zinc-300 text-sm"><span className="font-semibold">Occupation:</span> {c.occupation}</p>
                      <p className="text-zinc-300 text-sm py-1"><span className="font-semibold">Net Worth:</span> <span className="text-green-500 font-semibold bg-green-500/20 border border-green-500 rounded-full px-2 py-0.5">${c.net_worth_billion} B</span></p>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
    </main>
  );
}
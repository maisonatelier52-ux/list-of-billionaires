import Image from "next/image";
import data from "@/data/fictional-characters.json";
import FictionalTable from "../components/FictionalTable";

export const metadata = {
  title: "Richest Fictional Characters",
  description: "A list of fictional characters ranked by estimated net worth.",
};

export default function FictionalCharactersPage() {
  return (
    <main className="bg-black text-zinc-200 min-h-screen">

      {/* HERO IMAGE */}
      <div className="relative w-full h-[500px] md:h-[500px] overflow-hidden">
        <Image
          src="/fictional/fictional-billionaires-hero2.jpg"
          alt="Richest Fictional Characters"
          fill
          priority
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

        {/* Hero text */}
        <div className="absolute bottom-10 left-0 right-0 max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            World's Richest Fictional Characters
          </h1>
          <p className="text-lg text-zinc-200 max-w-2xl">
            From dragons guarding ancient treasure to billionaire superheroes,
            discover the fictional characters with the greatest fortunes ever imagined.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* INTRO TEXT */}
        <div className="max-w-4xl mb-12 text-zinc-300 text-s">

          <p className="text-lg mb-4 font-semibold text-white">
            Ever wondered who would top the list if fictional characters were included?
          </p>

          <p className="mb-3">
            These fictional billionaires have amassed fortunes through everything
            from ancient treasure hoarding to modern technological innovation.
            Some built global corporations, others inherited unimaginable
            fortunes, while a few discovered magical sources of endless wealth.
          </p>

          <p>
            This comprehensive ranking reveals the most financially successful
            fictional characters, analyzing their wealth sources, investment
            strategies, and the economic impact of their fictional fortunes.
          </p>
        </div>


        {/* BOTTOM CONTENT */}
        <div className="max-w-4xl my-7 space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Lessons from Fictional Billionaires
          </h2>

          <p className="text-zinc-400">
            While these characters exist only in fiction, their wealth-building
            strategies mirror real-world financial principles like long-term
            thinking, innovation, and strategic expansion.
          </p>

          <p className="text-zinc-400">
            Whether built through ancient treasure hoards, global corporations,
            or futuristic technology, these fictional fortunes demonstrate the
            ultimate extremes of wealth accumulation.
          </p>
        </div>

        <FictionalTable data={data} />
      </div>
    </main>
  );
}
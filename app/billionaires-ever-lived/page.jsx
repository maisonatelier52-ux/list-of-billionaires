import Image from "next/image";
import data from "@/data/billionaires-ever-lived.json";
import BillionairesTable from "../components/BillionairesEverLivedTable";

export const metadata = {
  title: "Richest People Who Ever Lived",
  description:
    "A ranking of the richest people in history including emperors, kings, industrialists, and modern billionaires.",
};

export default function Page() {
  return (
    <main className="bg-black text-zinc-200 min-h-screen">

      {/* HERO IMAGE */}
      <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden">

        <Image
          src="/ever-lived/billionaires-ever-lived.jpeg"
          alt="Richest People in History"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

        {/* Hero Text */}
        <div className="absolute bottom-10 left-0 right-0 max-w-7xl mx-auto px-6">

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Richest People Who Ever Lived
          </h1>

          <p className="text-lg text-zinc-200 max-w-2xl">
            From ancient emperors controlling vast empires to modern tech
            billionaires building global corporations, explore the richest
            individuals in human history.
          </p>

        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* INTRODUCTION */}
        <div className="max-w-4xl mb-12 text-zinc-300">

          <p className="text-lg mb-4 font-semibold text-white">
            Wealth has shaped the course of history for centuries.
          </p>

          <p className="mb-3">
            Throughout different eras, a handful of individuals accumulated
            extraordinary fortunes that far exceeded the wealth of their
            contemporaries. Some ruled powerful empires and controlled vast
            territories, while others built massive industrial or financial
            enterprises.
          </p>

          <p>
            This ranking brings together monarchs, conquerors, industrialists,
            and modern entrepreneurs to compare their wealth using historical
            estimates and modern economic equivalents. While exact values are
            difficult to measure across centuries, these figures represent the
            most widely accepted estimates of historical wealth.
          </p>

        </div>


        {/* HISTORICAL CONTEXT */}
        <div className="max-w-4xl my-10 space-y-4">

          <h2 className="text-2xl font-bold text-white">
            Comparing Wealth Across History
          </h2>

          <p className="text-zinc-400">
            Measuring wealth across centuries is challenging. Ancient rulers
            often controlled the resources of entire empires rather than
            personal fortunes, making direct comparisons difficult. In many
            cases, historians estimate wealth by examining the share of global
            GDP controlled by an empire during a ruler's reign.
          </p>

          <p className="text-zinc-400">
            Modern billionaires, on the other hand, derive their wealth from
            corporations, investments, and global markets. By converting these
            fortunes into modern equivalents, historians and economists attempt
            to provide a clearer comparison between past and present wealth.
          </p>

        </div>


        {/* TABLE */}
        <BillionairesTable data={data} />

      </div>
    </main>
  );
}
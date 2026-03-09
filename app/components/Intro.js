"use client";

import Image from "next/image";
import BillionairesByCountryTreemap from "./CountryTreemap";

export default function BillionairesIntro() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 space-y-8 text-l">
      
      <div className="prose prose-lg max-w-none">
        <p className="first-letter:text-[64px] first-letter:font-bold first-letter:text-red-600 first-letter:float-left first-letter:leading-none first-letter:mr-2">
            The world’s billionaires represent more than just vast personal wealth —
            they reflect the shifting centers of power, innovation, and global
            influence. From technology visionaries and industrial magnates to
            retail pioneers and financial strategists, today’s ultra-wealthy have
            shaped entire industries and redefined how modern economies function.
            Their fortunes rise and fall with market cycles, geopolitical changes,
            and breakthroughs in science and digital transformation.
        </p>
    </div>

        <BillionairesByCountryTreemap />

      <div className="prose prose-lg max-w-none">
        <p>
          In 2026, the composition of billionaire rankings continues to evolve.
          Technology remains a dominant force, with artificial intelligence,
          clean energy, biotechnology, and space exploration generating immense
          value. Meanwhile, traditional sectors such as luxury goods, real
          estate, and commodities maintain strong representation among the
          wealthiest individuals. Emerging markets are also contributing new
          entrants, highlighting the globalization of capital and opportunity.
        </p>

        <p className="pt-3">
          Beyond their financial standing, billionaires increasingly influence
          philanthropy, public discourse, and innovation ecosystems. Major
          charitable foundations and private investment arms fund medical
          research, education initiatives, and environmental sustainability
          projects. Their decisions can impact millions of lives — from job
          creation to technological access and policy advocacy.
        </p>
      </div>

      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/intro2.jpg"
          alt="Technology innovation concept"
          fill
          className="object-cover"
        />
      </div>

      <div className="prose prose-lg max-w-none">
        <p>
          However, the rise in global wealth concentration has also sparked
          important conversations about inequality, taxation, and corporate
          responsibility. Governments worldwide are debating fiscal reforms and
          regulatory measures to balance innovation incentives with broader
          social equity. Investors and consumers alike now expect transparency
          and ethical leadership from those at the top of global wealth
          rankings.
        </p>

        <p className="pt-3">
          This ranking provides a comprehensive overview of the individuals who
          currently stand at the pinnacle of global wealth. Net worth estimates
          are calculated using publicly available data, stock valuations, and
          reported assets. As markets fluctuate daily, so too can the order of
          the list — making it a dynamic snapshot of economic power in real
          time.
        </p>

        <p className="pt-3">
          Whether you follow the rankings out of curiosity, investment insight,
          or economic interest, the stories behind these fortunes offer a
          fascinating lens into ambition, risk, resilience, and global impact.
          The list below highlights the most influential billionaires shaping
          the financial landscape in 2026.
        </p>
      </div>

    </section>
  );
}
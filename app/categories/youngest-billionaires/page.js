import Image from "next/image";
import data from "@/data/billionaires.json";
import ReactCountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

function getCountryCode(countryName) {
  return countries.getAlpha2Code(countryName, "en");
}

import {
  FaLaptopCode,
  FaMoneyBillWave,
  FaTshirt,
  FaBoxes,
  FaUtensils,
  FaHeartbeat,
  FaIndustry,
  FaBuilding,
  FaTruck,
  FaMountain,
  FaBroadcastTower,
  FaCar,
  FaHardHat
} from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: "Youngest Billionaires in the World",
  description:
    "Discover the youngest billionaires globally, their wealth, industry and background.",
};

/* INDUSTRY ICON MAP */

const industryIcons = {
  Technology: FaLaptopCode,
  Finance: FaMoneyBillWave,
  "Fashion and Retail": FaTshirt,
  Diversified: FaBoxes,
  "Food and Beverage": FaUtensils,
  Healthcare: FaHeartbeat,
  Manufacturing: FaIndustry,
  "Real Estate": FaBuilding,
  Logistics: FaTruck,
  "Metals and Mining": FaMountain,
  Telecom: FaBroadcastTower,
  Automotive: FaCar,
  Construction: FaHardHat
};

export default function YoungestBillionairesPage() {

  const billionaires = [...data]
    .sort((a, b) => a.Age - b.Age)
    .slice(0, 10);

  return (
    <main className="bg-black text-zinc-200 min-h-screen">

      {/* HERO */}

      <div className="relative w-full h-[440px] overflow-hidden">
        <Image
          src="/background.jpg"
          alt="Youngest Billionaires"
          fill
          priority
          className="object-cover brightness-100"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black" />

        <div className="absolute bottom-12 left-0 right-0 max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-4">
            Youngest Billionaires in the World
          </h1>

          <p className="text-zinc-300 max-w-2xl">
            Meet the youngest members of the global billionaire class.
            These individuals built or inherited extraordinary fortunes
            at a remarkably young age.
          </p>
        </div>
      </div>


      {/* LIST */}

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">

        {billionaires.map((person, index) => {

          const Icon =
            industryIcons[person.Industry] || FaIndustry;

          return (
            <div
              key={person.slug}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800 transition"
            >

              <div className="flex gap-6">

                {/* IMAGE */}

                <div className="relative w-32 h-44 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={person.image}
                    alt={person.Name}
                    fill
                    className="object-cover"
                  />
                </div>


                {/* DETAILS */}

                <div className="flex-1">

                  {/* HEADER */}

                  <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-semibold text-white">
                      #{index + 1} 
                      <Link href={`/${person.slug}`} className="pl-3 hover:underline">
                        {person.Name}
                      </Link>
                    </h2>

                    <span className="text-green-400 font-bold text-xl">
                      ${person.Net_Worth_USD_Billion}B
                    </span>

                  </div>


                  {/* META */}

                  <div className="flex flex-wrap gap-6 text-sm text-zinc-400 mt-2">

                    <span>
                      Age: <b className="text-zinc-200">{person.Age}</b>
                    </span>

                    <span>
                      Country: 
                      <b className="font-semibold text-zinc-200">
                        <ReactCountryFlag
                          countryCode={getCountryCode(person.Country)}
                          svg
                          style={{ width: "20px", height: "15px", marginLeft: "6px", marginRight: "4px" }}
                        />
                        {person.Country}
                      </b>
                    </span>

                    <span>
                      City: <b className="text-zinc-200">{person.City}</b>
                    </span>

                    <span>
                      Continent: <b className="text-zinc-200">{person.Continent}</b>
                    </span>

                  </div>


                  {/* INDUSTRY */}

                  <div className="flex items-center gap-2 mt-4 text-zinc-300">

                    <Icon className="text-green-400 text-lg" />

                    <span>{person.Industry}</span>

                  </div>


                  {/* SOURCE */}

                  <div className="mt-2 text-sm text-zinc-400">

                    Source of Wealth:{" "}
                    <span className="text-zinc-200">
                      {person.Source_of_Wealth}
                    </span>

                  </div>


                  {/* EXTRA INFO */}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-xs text-zinc-400">

                    <div>
                      <p>Marital Status</p>
                      <p className="text-zinc-200">{person.Marital_Status}</p>
                    </div>

                    <div>
                      <p>Children</p>
                      <p className="text-zinc-200">{person.Children}</p>
                    </div>

                    <div>
                      <p>Gender</p>
                      <p className="text-zinc-200">{person.Sex}</p>
                    </div>

                    <div>
                      <p>Rank</p>
                      <p className="text-zinc-200">{person.Rank}</p>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
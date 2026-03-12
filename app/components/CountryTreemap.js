"use client";

import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import data from "@/data/billionaires.json";
import ReactCountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

function getCountryCode(countryName) {
  return countries.getAlpha2Code(countryName, "en") || "UN"; // UN for Unknown
}

export default function BillionairesByCountryTreemap() {
  if (!data || !Array.isArray(data)) return null;

  // Count billionaires per country
  const countryCount = {};
  const countryWealth = {};

  data.forEach((person) => {
    const country = person.Country || "Unknown";
    if (!countryCount[country]) countryCount[country] = 0;
    if (!countryWealth[country]) countryWealth[country] = 0;

    countryCount[country]++;
    countryWealth[country] += person.Net_Worth_USD_Billion || 0;
  });

  // Convert to chart format
  let chartData = Object.entries(countryCount)
    .map(([name, value]) => ({
      name,
      value,
      totalWealth: countryWealth[name].toFixed(1),
    }))
    .sort((a, b) => b.value - a.value);

  const COLORS = [
    "#629af3", "#7b7df3", "#9d77f4", "#eb77b1",
    "#ef7272", "#edbd6b", "#5faf94", "#6dd2c6",
    "#f39c12", "#8e44ad", "#c0392b", "#2c3e50"
  ];

  const CustomContent = ({ x, y, width, height, name, value, totalWealth, index, isOther }) => {

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={COLORS[index % COLORS.length]}
        />
        <foreignObject x={x + 5} y={y + 5} width={width - 10} height={height - 10}>
          <div className="flex flex-col text-white text-[11px] overflow-hidden">
            {!isOther && (
              <ReactCountryFlag
                countryCode={getCountryCode(name)}
                svg
                style={{ width: "16px", height: "12px" }}
              />
            )}
            <span className="font-semibold truncate">{name}</span>
            <span className="truncate">{value} billionaires</span>
            <span className="truncate text-green-300">${totalWealth}B</span>
          </div>
        </foreignObject>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-violet-600/90 to-purple-700/90 text-white px-5 py-4 rounded-2xl shadow-2xl border border-violet-400/30 min-w-[200px]">
      
      <p className="text-xs uppercase tracking-wider text-violet-200 mb-1">
        Country
      </p>
      <p className="text-lg font-bold gap-2 flex items-center">
        <ReactCountryFlag
            countryCode={getCountryCode(data.name)}
            svg
            style={{ width: "16px", height: "12px" }}
        />
        {data.name}
      </p>

      <div className="h-px bg-violet-300/30 my-2" />

      <p className="text-sm text-violet-100">
        {data.value} billionaires
      </p>
      <p className="text-sm text-green-300">
        Total Wealth: ${data.totalWealth}B
      </p>
    </div>
  );
};

  return (
    <div className="w-full h-[550px]">
      <h2 className="text-3xl font-bold text-white mb-4">Billionaires by Country (2026)</h2>
      <ResponsiveContainer width="100%" height="90%">
        <Treemap
          data={chartData}
          dataKey="value"
          content={<CustomContent />}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
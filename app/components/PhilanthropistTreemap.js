"use client";

import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ReactCountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

function getCountryCode(countryName) {
  return countries.getAlpha2Code(countryName, "en") || "UN";
}

export default function PhilanthropistTreemap({ data }) {

  const sorted = [...data].sort(
    (a, b) =>
      (b.Total_Donated_USD_Billion || 0) -
      (a.Total_Donated_USD_Billion || 0)
  );

  let chartData = sorted.map((person) => ({
    name: person.Name,
    country: person.Country,
    value: person.Total_Donated_USD_Billion || 0,
  }));

  if (chartData.length > 22) {
    const top20 = chartData.slice(0, 22);
    const others = chartData.slice(22);

    const number = data.length - 22;

    const othersTotal = others.reduce(
      (sum, item) => sum + item.value,
      0
    );

    chartData = [
      ...top20,
      { name: `Others (${number})`, value: othersTotal, isOther: true },
    ];
  }

  const COLORS = [
    "#629af3",
    "#7b7df3",
    "#9d77f4",
    "#eb77b1",
    "#ef7272",
    "#edbd6b",
    "#5faf94",
    "#6dd2c6",
  ];

  const CustomizedContent = ({
    x,
    y,
    width,
    height,
    name,
    value,
    country,
    index,
    isOther
  }) => {

    if (value === 0) return null;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={COLORS[index % COLORS.length]}
        />

        <foreignObject
          x={x + 6}
          y={y + 6}
          width={width - 12}
          height={height - 12}
        >
          <div className="text-white text-[11px] flex flex-col overflow-hidden">

            {!isOther && (
              <ReactCountryFlag
                countryCode={getCountryCode(country)}
                svg
                style={{ width: "16px", height: "12px" }}
              />
            )}

            <span className="font-semibold truncate">
              {name}
            </span>

            <span className="text-zinc-200 truncate">
              ${value}B
            </span>

          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div className="w-full h-[550px] bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800">

      <h2 className="text-3xl font-bold text-white mb-4">
        Billionaire Donations
      </h2>

      <ResponsiveContainer width="100%" height={440}>
        <Treemap
          data={chartData}
          dataKey="value"
          content={<CustomizedContent />}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>

    </div>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-violet-600/90 to-purple-700/90 text-white px-5 py-4 rounded-2xl shadow-2xl border border-violet-400/30 min-w-[200px]">

      <p className="text-xs uppercase tracking-wider text-violet-200 mb-1">
        Philanthropist
      </p>

      <p className="text-lg font-bold flex items-center gap-2">
        {!data.isOther && (
          <ReactCountryFlag
            countryCode={getCountryCode(data.country)}
            svg
            style={{ width: "18px", height: "14px" }}
          />
        )}
        {data.name}
      </p>

      <div className="h-px bg-violet-300/30 my-2" />

      <p className="text-sm text-violet-100">
        Total Donated
      </p>

      <p className="text-lg font-bold text-green-300">
        ${data.value.toLocaleString()} Billion
      </p>

    </div>
  );
};

// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";

// import ReactCountryFlag from "react-country-flag";
// import countries from "i18n-iso-countries";
// import enLocale from "i18n-iso-countries/langs/en.json";

// countries.registerLocale(enLocale);

// function getCountryCode(countryName) {
//   return countries.getAlpha2Code(countryName, "en") || "UN";
// }

// export default function PhilanthropistTreemap({ data }) {

//   const sorted = [...data].sort(
//     (a, b) =>
//       (b.Total_Donated_USD_Billion || 0) -
//       (a.Total_Donated_USD_Billion || 0)
//   );

//   let chartData = sorted.map((person) => ({
//     name: person.Name,
//     country: person.Country,
//     value: person.Total_Donated_USD_Billion || 0,
//   }));

//   if (chartData.length > 22) {
//     const top20 = chartData.slice(0, 22);
//     const others = chartData.slice(22);

//     const number = data.length - 22;

//     const othersTotal = others.reduce(
//       (sum, item) => sum + item.value,
//       0
//     );

//     chartData = [
//       ...top20,
//       { name: `Others (${number})`, value: othersTotal, isOther: true },
//     ];
//   }

//   return (
//     <div className="w-full h-[550px] bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800">

//       <h2 className="text-3xl font-bold text-white mb-6">
//         Billionaire Donations
//       </h2>

//       <ResponsiveContainer width="100%" height={580}>

//         <BarChart
//           data={chartData}
//           margin={{ top: 20, right: 20, left: 0, bottom: 80 }}
//         >

//           <CartesianGrid strokeDasharray="3 3" stroke="#444" />

//           <XAxis
//             dataKey="name"
//             angle={-45}
//             textAnchor="end"
//             height={120}
//             tick={{ fill: "#ddd", fontSize: 11}}
//           />

//           <YAxis
//             tick={{ fill: "#ddd" }}
//             label={{
//               value: "Donations (Billion USD)",
//               angle: -90,
//               position: "insideLeft",
//               fill: "#ddd",
//             }}
//           />

//           <Tooltip content={<CustomTooltip />} />

//           <Bar
//             dataKey="value"
//             radius={[6, 6, 0, 0]}
//             fill="#7b7df3"
//           />

//         </BarChart>

//       </ResponsiveContainer>

//     </div>
//   );
// }

// const CustomTooltip = ({ active, payload }) => {

//   if (!active || !payload || !payload.length) return null;

//   const data = payload[0].payload;

//   return (
//     <div className="backdrop-blur-xl bg-gradient-to-br from-violet-600/90 to-purple-700/90 text-white px-5 py-4 rounded-2xl shadow-2xl border border-violet-400/30 min-w-[200px]">

//       <p className="text-xs uppercase tracking-wider text-violet-200 mb-1">
//         Philanthropist
//       </p>

//       <p className="text-lg font-bold flex items-center gap-2">
//         {!data.isOther && (
//           <ReactCountryFlag
//             countryCode={getCountryCode(data.country)}
//             svg
//             style={{ width: "18px", height: "14px" }}
//           />
//         )}
//         {data.name}
//       </p>

//       <div className="h-px bg-violet-300/30 my-2" />

//       <p className="text-sm text-violet-100">
//         Total Donated
//       </p>

//       <p className="text-lg font-bold text-green-300">
//         ${data.value.toLocaleString()} Billion
//       </p>

//     </div>
//   );
// };
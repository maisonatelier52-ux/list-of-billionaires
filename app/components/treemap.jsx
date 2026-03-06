"use client";

import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function BillionaireTreemap({ data }) {

  // Sort descending by net worth
  const sorted = [...data].sort(
    (a, b) => b.Net_Worth_USD_Billion - a.Net_Worth_USD_Billion
  );

  let chartData = sorted.map((person) => ({
    name: person.Name,
    value: person.Net_Worth_USD_Billion,
  }));

//   If more than 20 → group others
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
      { name: `Others (${number})`, value: othersTotal },
    ];
  }

  // Primary modern color palette
  const COLORS = [
    "#629af3", // blue
    "#7b7df3", // indigo
    "#9d77f4", // purple
    "#eb77b1", // pink
    "#ef7272", // red
    "#edbd6b", // amber
    "#5faf94", // emerald
    "#6dd2c6", // teal
  ];

  const CustomizedContent = (props) => {
    const { x, y, width, height, name, value, index } = props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={COLORS[index % COLORS.length]}
        />
        <text
          x={x + 8}
          y={y + 20}
          fill="#fff"
          fontSize={12}
          fontWeight="600"
        >
          {name}
        </text>
        <text
          x={x + 8}
          y={y + 35}
          fill="#e5e7eb"
          fontSize={11}
        >
          ${value}B
        </text>
      </g>
    );
  };

  return (
    <div className="w-full h-[550px] bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800">

      <h2 className="text-3xl font-bold text-white mb-4">
        Billionaires by Net Worth
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

  const data = payload[0];

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-violet-600/90 to-purple-700/90 text-white px-5 py-4 rounded-2xl shadow-2xl border border-violet-400/30 min-w-[180px]">

      <p className="text-xs uppercase tracking-wider text-violet-200 mb-1">
        Net Worth
      </p>

      <p className="text-lg font-bold">
        ${data.value.toLocaleString()} Billion
      </p>

      <div className="h-px bg-violet-300/30 my-2" />

      <p className="text-sm text-violet-100">
        {data.payload.name}
      </p>

    </div>
  );
};
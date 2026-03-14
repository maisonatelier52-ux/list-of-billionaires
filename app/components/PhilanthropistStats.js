"use client";

export default function PhilanthropyStats({ data }) {

  const philanthropists = data.filter(p => p.Philanthropist);

  const totalDonations = philanthropists.reduce(
    (sum, p) => sum + (p.Total_Donated_USD_Billion || 0),
    0
  );

  const avgDonation =
    philanthropists.length > 0
      ? totalDonations / philanthropists.length
      : 0;

  const topDonor = philanthropists.reduce((max, p) =>
    (p.Total_Donated_USD_Billion || 0) >
    (max?.Total_Donated_USD_Billion || 0)
      ? p
      : max,
    philanthropists[0]
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {/* Total Donations */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <p className="text-zinc-400 text-sm">Total Donated</p>
        <p className="text-2xl font-bold text-green-400 mt-1">
          ${totalDonations.toLocaleString()}B
        </p>
      </div>

      {/* Largest Donor */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <p className="text-zinc-400 text-sm">Largest Donor</p>
        <p className="text-xl font-semibold text-white mt-1">
          {topDonor?.Name}
        </p>
        <p className="text-sm text-zinc-500">
          ${topDonor?.Total_Donated_USD_Billion?.toLocaleString()}B
        </p>
      </div>

      {/* Philanthropists */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <p className="text-zinc-400 text-sm">Philanthropists</p>
        <p className="text-2xl font-bold text-white mt-1">
          {philanthropists.length}
        </p>
      </div>

      {/* Average Donation */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <p className="text-zinc-400 text-sm">Average Donation</p>
        <p className="text-2xl font-bold text-white mt-1">
          ${avgDonation.toFixed(1)}B
        </p>
      </div>

    </div>
  );
}
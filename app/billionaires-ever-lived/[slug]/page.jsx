import data from "@/data/billionaires-ever-lived.json";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SITE_URL = "https://www.list-of-billionaires.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const billionaire = data.billionaires.find((c) => c.slug === slug);

  if (!billionaire) {
    return {
      title: "Billionaire Not Found",
    };
  }

  const title = `${billionaire.name} - Richest Person Who Ever Lived (#${billionaire.rank})`;
  const description = billionaire.description || `${billionaire.name} is ranked #${billionaire.rank} among the richest people who ever lived with an estimated net worth of $${billionaire.net_worth || 'N/A'}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/billionaires-ever-lived/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/billionaires-ever-lived/${slug}`,
      siteName: "List of Billionaires",
      images: [
        {
          url: billionaire.image,
          width: 1200,
          height: 630,
          alt: billionaire.name,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [billionaire.image],
    },
  };
}

export default async function BillionairEverPage({ params }) {
  const { slug } = await params;

  const billionaire = data.billionaires.find((c) => c.slug === slug);

  if (!billionaire) return notFound();

  const related = data.billionaires.filter(c => c.slug !== slug).slice(0, 3);

  return (
    <main className="bg-black text-gray-200 min-h-screen">

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: billionaire.name,
            description: billionaire.description,
            image: billionaire.image,
            position: billionaire.rank,
            netWorth: billionaire.net_worth ? {
              "@type": "MonetaryAmount",
              currency: "USD",
              value: billionaire.net_worth,
            } : undefined,
          }),
        }}
      />

      {/* HERO IMAGE */}
      <div className="w-full h-[500px] relative mb-20 overflow-hidden">
        <Image
          src={billionaire.image_banner}
          alt={billionaire.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 md:flex md:gap-12">

        {/* LEFT IMAGE */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="sticky top-28 w-64 h-96 md:h-[400px] rounded-2xl overflow-hidden shadow-lg -mt-32 border border-zinc-800">
            <Image
              src={billionaire.image}
              alt={billionaire.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="md:w-2/3 space-y-6 -mt-32 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">

          <h1 className="text-5xl font-bold">
            #{billionaire.rank} {billionaire.name}
          </h1>

          {/* Wealth */}
          <div>
            <span className="px-4 py-2 bg-green-500/20 border border-green-500 text-green-400 text-sm rounded-full">
              Estimated Wealth: {billionaire.estimatedWealth}
            </span>
          </div>

          {/* Info */}
          <div className="mt-6 space-y-2 text-zinc-300 text-sm">
            <p>
              <span className="font-semibold text-white">Empire / Country:</span>{" "}
              {billionaire.countryOrEmpire}
            </p>

            <p>
              <span className="font-semibold text-white">Era:</span>{" "}
              {billionaire.era}
            </p>
          </div>

        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-24 max-w-6xl px-6 mx-auto pb-10">

          <h2 className="text-3xl font-bold text-center text-white mb-10">
            Other Historic Billionaires
          </h2>

          <div className="flex justify-center gap-8">

            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/billionaires-ever-lived/${c.slug}`}
                className="relative group w-64 h-80 overflow-hidden rounded-2xl border border-zinc-800 shadow-lg"
              >

                {/* Image */}
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover"
                />

                {/* Slide Panel */}
                <div className="absolute inset-0 bg-black/80 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 p-4 flex flex-col justify-center">

                  <h3 className="text-white text-xl font-bold mb-2">
                    #{c.rank} {c.name}
                  </h3>

                  <p className="text-zinc-300 text-sm">
                    {c.countryOrEmpire}
                  </p>

                  <p className="text-zinc-300 text-sm mb-2">
                    {c.era}
                  </p>

                  <p className="text-green-400 text-sm font-semibold">
                    {c.estimatedWealth}
                  </p>

                </div>

              </Link>
            ))}

          </div>

        </section>
      )}

    </main>
  );
}
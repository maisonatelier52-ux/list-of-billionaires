const SITE_URL = "https://www.list-of-billionaires.com";

export const metadata = {
  title: "About | List of Billionaires",
  description:
    "Learn about List-of-Billionaires.com, our mission, and how we provide transparent data on the world's richest individuals.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About | List of Billionaires",
    description:
      "Discover the mission behind List-of-Billionaires.com and how we track global billionaire wealth data.",
    url: `${SITE_URL}/about`,
    siteName: "List of Billionaires",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "List of Billionaires",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | List of Billionaires",
    description:
      "Learn about List-of-Billionaires.com and our mission to track global billionaire wealth.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function AboutPage() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About List of Billionaires",
    url: `${SITE_URL}/about`,
    description:
      "Information about List-of-Billionaires.com and our mission to provide transparent data on the world's wealthiest individuals.",
    mainEntity: {
      "@type": "Organization",
      name: "List of Billionaires",
      url: SITE_URL,
      description:
        "A data-driven website that tracks and presents information about the world's wealthiest individuals.",
      sameAs: [
        "https://twitter.com/",
        "https://linkedin.com/",
      ],
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-gray-100">

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-4xl font-bold mb-6">
        About List of Billionaires
      </h1>

      <p className="text-zinc-400 mb-10">
        <strong>Last Updated:</strong> March 2026
      </p>

      <p className="mb-4">
        <b>list-of-billionaires.com</b> is a data-driven website that tracks and
        presents information about the world's wealthiest individuals.
      </p>

      <p className="mb-4">
        Our mission is to make billionaire wealth <b>data accessible,
        transparent, and easy to understand</b> for researchers, students,
        journalists, and curious readers around the world.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        What We Do
      </h2>

      <p className="mb-4">
        We compile and organize publicly available financial data to create
        structured profiles of billionaires, including:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>Estimated net worth</li>
        <li>Global ranking</li>
        <li>Industry and business sectors</li>
        <li>Source of wealth</li>
        <li>Country of residence</li>
      </ul>

      <p className="mb-4">
        Our platform allows readers to explore wealth trends across industries
        such as technology, finance, retail, manufacturing, and natural resources.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Our Approach
      </h2>

      <p className="mb-4">
        We focus on clear data presentation and visualization so users can
        quickly understand how wealth is distributed among the world’s richest individuals.
      </p>

      <p className="mb-4">This includes:</p>

      <ul className="list-disc list-inside mb-4">
        <li>Interactive rankings</li>
        <li>Industry breakdowns</li>
        <li>Wealth comparisons</li>
        <li>Data visualizations and charts</li>
      </ul>

      <p className="mb-4">
        Our goal is to turn complex financial information into simple and meaningful insights.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Data Sources
      </h2>

      <p className="mb-4">
        The information presented on List-of-Billionaires.com is compiled from a
        variety of publicly available sources, including financial publications,
        corporate filings, public disclosures, and reputable business media.
      </p>

      <p className="mb-4">
        Net worth figures are estimates based on publicly available information
        and may fluctuate due to market conditions, asset valuations, and currency changes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Contact Us
      </h2>

      <p className="mb-4">
        If you have any questions, suggestions, or would like to contribute data,
        please feel free to reach out to us through our website.
      </p>

      <div className="italic mt-16 pt-6 border-t border-zinc-800 text-sm text-zinc-500">
        list-of-billionaires.com — Exploring the world’s wealthiest individuals through data.
      </div>

    </div>
  );
}
export const metadata = {
  title: "Terms of Use | List of Billionaires",
  description:
    "Terms of Use for List-of-Billionaires.com outlining the rules, policies, and limitations for using our website.",
  alternates: {
    canonical: "https://www.list-of-billionaires.com/terms-of-use",
  },
  openGraph: {
    title: "Terms of Use | List of Billionaires",
    description:
      "Rules, policies, and limitations for using List-of-Billionaires.com.",
    url: "https://www.list-of-billionaires.com/terms-of-use",
    siteName: "List of Billionaires",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUsePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Use",
    url: "https://www.list-of-billionaires.com/terms-of-use",
    description:
      "Terms of Use outlining the rules and policies for using List-of-Billionaires.com.",
    publisher: {
      "@type": "Organization",
      name: "List of Billionaires",
      url: "https://www.list-of-billionaires.com",
    },
    dateModified: "2026-03-01",
  };

  return (
    <main className="bg-black text-zinc-300 min-h-screen">

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="max-w-4xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-white mb-4">
          Terms of Use
        </h1>

        <p className="text-zinc-400 mb-10">
          <strong>Last Updated:</strong> March 2026
        </p>

        <p className="mb-6">
          Welcome to <strong>List-of-Billionaires.com</strong>. By accessing or
          using this website, you agree to comply with and be bound by the
          following Terms of Use. If you do not agree with these terms, please
          do not use the website.
        </p>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing List-of-Billionaires.com, you acknowledge that you
            have read, understood, and agree to be bound by these Terms of Use
            and all applicable laws and regulations.
          </p>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            2. Informational Purpose Only
          </h2>
          <p>
            The content provided on this website is for informational and
            educational purposes only. The financial information, net worth
            estimates, rankings, and other data presented may change over time
            and should not be considered financial, legal, or investment
            advice.
          </p>
          <p>
            Users should independently verify any information before making
            financial or business decisions.
          </p>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            3. Data Accuracy
          </h2>

          <p>
            List-of-Billionaires.com compiles information from publicly
            available sources including financial publications, corporate
            disclosures, and reputable media outlets.
          </p>

          <p>
            While we strive to provide accurate and up-to-date information,
            we do not guarantee the completeness, reliability, or accuracy
            of the data presented.
          </p>

          <p>Net worth figures are estimates and may fluctuate due to:</p>

          <ul className="list-disc pl-6 space-y-2 text-zinc-400">
            <li>Market conditions</li>
            <li>Asset valuation changes</li>
            <li>Currency fluctuations</li>
            <li>Business developments</li>
          </ul>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            4. Intellectual Property
          </h2>

          <p>
            All content on this website, including text, design, graphics,
            and data presentation, is the property of
            <strong> List-of-Billionaires.com</strong> unless otherwise stated.
          </p>

          <p>You may:</p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400">
            <li>View the content for personal and informational use.</li>
          </ul>

          <p>You may not:</p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400">
            <li>Reproduce or redistribute large portions of the data</li>
            <li>Republish the content without permission</li>
            <li>Use the website’s content for commercial purposes</li>
          </ul>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            5. External Links
          </h2>

          <p>
            Our website may contain links to third-party websites for
            additional information or reference. We are not responsible
            for the content, policies, or practices of those external sites.
          </p>

          <p>Accessing third-party websites is done at your own risk.</p>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            6. Limitation of Liability
          </h2>

          <p>
            List-of-Billionaires.com shall not be held liable for any direct,
            indirect, incidental, or consequential damages resulting from:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-zinc-400">
            <li>Use of the website</li>
            <li>Reliance on the information provided</li>
            <li>Errors or omissions in the data</li>
          </ul>

          <p>All information is provided “as is” without warranties.</p>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            7. Changes to the Website
          </h2>

          <p>
            We reserve the right to modify, update, or discontinue
            any part of the website at any time without notice.
          </p>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            8. Changes to These Terms
          </h2>

          <p>
            We may update these Terms of Use periodically. Continued
            use of the website after updates indicates acceptance
            of the revised terms.
          </p>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            9. Governing Law
          </h2>

          <p>
            These Terms shall be governed by applicable laws without
            regard to conflict of law principles.
          </p>
        </section>

        {/* Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            10. Contact
          </h2>

          <p>
            If you have questions regarding these Terms of Use,
            you may contact us through the website.
          </p>
        </section>

        <div className="italic mt-16 pt-6 border-t border-zinc-800 text-sm text-zinc-500">
          By using <strong>list-of-billionaires.com</strong>, you agree to
          these Terms of Use.
        </div>

      </div>
    </main>
  );
}
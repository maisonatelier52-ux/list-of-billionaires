export const metadata = {
  title: "Privacy Policy | List of Billionaires",
  description:
    "Privacy Policy for List-of-Billionaires.com explaining how we collect, use, and protect user information.",
  alternates: {
    canonical: "https://www.list-of-billionaires.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | List of Billionaires",
    description:
      "Privacy Policy explaining how List-of-Billionaires.com collects, uses, and protects visitor information.",
    url: "https://www.list-of-billionaires.com/privacy-policy",
    siteName: "List of Billionaires",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: "https://www.list-of-billionaires.com/privacy-policy",
    description:
      "Privacy Policy explaining how List-of-Billionaires.com collects, uses, and protects user information.",
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
          Privacy Policy
        </h1>

        <p className="text-zinc-400 mb-10">
          <strong>Last Updated:</strong> March 2026
        </p>

        <p className="mb-6">
          At <strong>List-of-Billionaires.com</strong>, we respect your privacy
          and are committed to protecting any information you may provide while
          using our website. This Privacy Policy explains how we collect, use,
          and safeguard your information.
        </p>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            1. Information We Collect
          </h2>

          <p>
            We may collect limited information when you interact with our
            website. This can include:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-zinc-400">
            <li>Basic usage data such as pages visited and time spent on the site</li>
            <li>Device information such as browser type and operating system</li>
            <li>Anonymous analytics data collected through third-party tools</li>
            <li>Information voluntarily submitted through forms (such as newsletter signup)</li>
          </ul>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            2. How We Use Information
          </h2>

          <p>The information collected may be used to:</p>

          <ul className="list-disc pl-6 space-y-2 text-zinc-400">
            <li>Improve website performance and user experience</li>
            <li>Understand how visitors use our website</li>
            <li>Maintain website security</li>
            <li>Provide updates or newsletters if users subscribe</li>
          </ul>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            3. Cookies
          </h2>

          <p>
            Our website may use cookies and similar technologies to enhance
            user experience and analyze website traffic.
          </p>

          <p>
            Cookies are small files stored on your device that help us
            understand how visitors interact with our website.
          </p>

          <p>
            You can choose to disable cookies through your browser settings,
            although some features of the website may not function properly.
          </p>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            4. Third-Party Services
          </h2>

          <p>
            We may use trusted third-party services such as analytics providers
            to help us understand website usage.
          </p>

          <p>
            These services may collect anonymous information according to their
            own privacy policies. We do not control how third-party services
            collect or use data.
          </p>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            5. Data Security
          </h2>

          <p>
            We take reasonable steps to protect the information collected on
            this website. However, no method of internet transmission or
            electronic storage is completely secure.
          </p>

          <p>
            Therefore, we cannot guarantee absolute security of any data
            transmitted through the website.
          </p>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            6. Children's Privacy
          </h2>

          <p>
            List-of-Billionaires.com is not directed toward children under the
            age of 13. We do not knowingly collect personal information from
            children.
          </p>

          <p>
            If we become aware that personal information from a child has been
            collected, we will take appropriate steps to remove such data.
          </p>
        </section>

        {/* Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-semibold text-white">
            7. Changes to This Privacy Policy
          </h2>

          <p>
            We may update this Privacy Policy periodically. Any updates will be
            posted on this page with a revised "Last Updated" date.
          </p>

          <p>
            Continued use of the website after updates indicates acceptance of
            the revised policy.
          </p>
        </section>

        {/* Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            8. Contact
          </h2>

          <p>
            If you have questions regarding this Privacy Policy, you may contact
            us through the website.
          </p>
        </section>

        <div className="mt-16 pt-6 border-t border-zinc-800 text-sm text-zinc-500">
          This Privacy Policy applies only to information collected through
          <strong> List-of-Billionaires.com</strong>.
        </div>

      </div>
    </main>
  );
}
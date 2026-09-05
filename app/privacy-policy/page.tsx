import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects information from visitors.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: September 4, 2026</p>

      <div className="mt-8 space-y-6 text-gray-700">
        <section>
          <h2 className="text-lg font-bold text-gray-900">1. Overview</h2>
          <p className="mt-2">
            {SITE_NAME} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
            operates this website to help visitors find coupon codes, promo
            codes and deals from third-party online stores. This Privacy
            Policy explains what information we collect when you visit the
            site and how it is used.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">2. Information We Collect</h2>
          <p className="mt-2">
            {SITE_NAME} does not require account registration and does not
            collect payment information. We may automatically collect
            limited technical information, such as your browser type, device
            type, and pages visited, through standard web server logs and,
            if enabled, analytics tools. If you contact us directly, we
            collect the information you choose to provide, such as your name
            and email address.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">3. Cookies &amp; Similar Technologies</h2>
          <p className="mt-2">
            We may use cookies or similar local storage technologies to
            remember basic preferences and, where enabled, to measure site
            usage through analytics. Third parties we link to, including
            retailers and affiliate networks, may also set their own cookies
            once you leave our site. See our{" "}
            <a href="/cookie-policy" className="text-brand-600 underline">
              Cookie Policy
            </a>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">4. Affiliate Links</h2>
          <p className="mt-2">
            This website contains affiliate links. When you click a coupon or
            deal and make a purchase, we may earn a commission from the
            retailer or affiliate network, at no additional cost to you.
            Clicking an affiliate link may result in the retailer or network
            setting a tracking cookie on your device to attribute the
            referral. See our{" "}
            <a href="/affiliate-disclosure" className="text-brand-600 underline">
              Affiliate Disclosure
            </a>{" "}
            for more information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">5. How We Use Information</h2>
          <p className="mt-2">
            Any information we collect is used to operate and improve the
            website, respond to inquiries, and understand how visitors use
            our content. We do not sell personal information to third
            parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">6. Third-Party Websites</h2>
          <p className="mt-2">
            Our site links to third-party retailer websites. We are not
            responsible for the privacy practices or content of those
            websites. We encourage you to review the privacy policy of any
            site you visit after leaving {SITE_NAME}.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">7. Children&apos;s Privacy</h2>
          <p className="mt-2">
            This website is not directed at children under 13, and we do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">8. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. Changes will
            be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">9. Contact Us</h2>
          <p className="mt-2">
            If you have questions about this Privacy Policy, please contact
            us at{" "}
            <a href={`mailto:${SITE_EMAIL}`} className="text-brand-600 underline">
              {SITE_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

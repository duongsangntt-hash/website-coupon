import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms and conditions for using the ${SITE_NAME} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Terms of Use" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: September 4, 2026</p>

      <div className="mt-8 space-y-6 text-gray-700">
        <section>
          <h2 className="text-lg font-bold text-gray-900">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing or using {SITE_NAME}, you agree to be bound by these
            Terms of Use. If you do not agree, please do not use this
            website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">2. Nature of the Service</h2>
          <p className="mt-2">
            {SITE_NAME} is a free, informational directory of coupon codes,
            promo codes and deals sourced from third-party retailers. We do
            not sell products, process payments, or manage user accounts. All
            purchases you make are between you and the applicable retailer.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">3. Accuracy of Offers</h2>
          <p className="mt-2">
            Coupon codes, discounts, prices, and expiration dates are set by
            individual retailers and are subject to change without notice.
            While we aim to keep offers accurate and up to date, we cannot
            guarantee that every coupon will work at checkout. Always confirm
            final pricing and terms on the retailer&apos;s website before
            completing a purchase.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">4. Affiliate Relationships</h2>
          <p className="mt-2">
            {SITE_NAME} participates in affiliate marketing programs. We may
            earn a commission when you click a link on this site and make a
            qualifying purchase, at no additional cost to you. See our{" "}
            <a href="/affiliate-disclosure" className="text-brand-600 underline">
              Affiliate Disclosure
            </a>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">5. Third-Party Websites</h2>
          <p className="mt-2">
            This website links to third-party retailer websites that we do
            not own or control. We are not responsible for the content,
            products, services, or business practices of any linked website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">6. Limitation of Liability</h2>
          <p className="mt-2">
            {SITE_NAME} is provided &quot;as is&quot; without warranties of
            any kind. We are not liable for any loss or damage arising from
            your use of this website or reliance on any coupon, deal, or
            information listed here.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">7. Intellectual Property</h2>
          <p className="mt-2">
            All original content on {SITE_NAME}, including text, design, and
            branding, is owned by {SITE_NAME} unless otherwise noted. Store
            names, logos, and trademarks referenced on this site belong to
            their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">8. Changes to These Terms</h2>
          <p className="mt-2">
            We may update these Terms of Use from time to time. Continued use
            of the website after changes are posted constitutes acceptance
            of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">9. Contact Us</h2>
          <p className="mt-2">
            Questions about these Terms of Use can be sent to{" "}
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

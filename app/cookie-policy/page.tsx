import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${SITE_NAME} and its partners use cookies.`,
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Cookie Policy" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        Cookie Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: September 4, 2026</p>

      <div className="mt-8 space-y-6 text-gray-700">
        <section>
          <h2 className="text-lg font-bold text-gray-900">1. What Are Cookies</h2>
          <p className="mt-2">
            Cookies are small text files stored on your device by your
            browser. They help websites remember information about your
            visit, such as preferences or, in the case of affiliate links,
            which site referred a purchase.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">2. How {SITE_NAME} Uses Cookies</h2>
          <p className="mt-2">
            {SITE_NAME} does not require cookies to browse coupons, stores,
            or deals. Where enabled, we may use cookies or similar
            technologies for basic site analytics, to understand which pages
            and offers are popular so we can improve the site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">3. Affiliate &amp; Third-Party Cookies</h2>
          <p className="mt-2">
            When you click a coupon or &quot;Get Deal&quot; button, you are
            taken to a third-party retailer&apos;s website through an
            affiliate link. The retailer or their affiliate network may set
            a tracking cookie at that point to record that your visit came
            from {SITE_NAME}, so that a commission can be attributed if you
            make a purchase. We do not control these third-party cookies.
            Review the privacy and cookie policies of any retailer you visit
            for more information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">4. Managing Cookies</h2>
          <p className="mt-2">
            Most browsers let you view, manage, and delete cookies through
            their settings. Blocking cookies may affect how some features on
            third-party retailer sites work, but will not prevent you from
            browsing coupons on {SITE_NAME}.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">5. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this Cookie Policy from time to time. Changes will
            be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900">6. Contact Us</h2>
          <p className="mt-2">
            Questions about this Cookie Policy can be sent to{" "}
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

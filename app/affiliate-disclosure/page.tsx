import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `How ${SITE_NAME} earns commissions through affiliate links.`,
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Affiliate Disclosure" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        Affiliate Disclosure
      </h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: September 4, 2026</p>

      <div className="mt-8 space-y-4 text-gray-700">
        <p>
          {SITE_NAME} is a free coupon and deal discovery website. This
          website contains affiliate links. We may earn a commission when
          you purchase through our links, at no additional cost to you.
        </p>
        <p>
          When you click on a coupon, promo code, or &quot;Get Deal&quot;
          button on {SITE_NAME}, you may be taken to a retailer&apos;s
          website through a tracked affiliate link. If you make a purchase
          after clicking that link, the retailer or an affiliate network may
          pay us a commission. This commission has no effect on the price
          you pay.
        </p>
        <p>
          Our goal is to help you find useful, working coupons and deals.
          Coupons and offers are curated by our team, but discounts, prices,
          and availability are controlled by the individual retailers and
          can change at any time. We do not guarantee that every coupon will
          work at checkout.
        </p>
        <p>
          {SITE_NAME} is independently operated and is not owned by or
          affiliated with the retailers listed on this site unless
          explicitly stated. Store names and logos belong to their
          respective owners and are used for identification purposes only.
        </p>
        <p>
          If you have questions about this disclosure, contact us at{" "}
          <a href={`mailto:${SITE_EMAIL}`} className="text-brand-600 underline">
            {SITE_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

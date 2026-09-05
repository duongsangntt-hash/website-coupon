import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn how ${SITE_NAME} curates coupons, promo codes and deals to help shoppers find better prices online.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "About" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        About {SITE_NAME}
      </h1>

      <div className="mt-6 space-y-4 text-gray-700">
        <p>
          {SITE_NAME} is a coupon and deal discovery website. We search and
          curate deals from online stores to help shoppers discover better
          prices, so you can spend less time hunting for codes and more time
          shopping.
        </p>
        <p>
          Our team reviews coupon codes and offers submitted by stores and
          affiliate networks, organizes them by store and category, and keeps
          the list updated so expired offers don&apos;t waste your time.
        </p>
        <p>
          {SITE_NAME} is free to use and doesn&apos;t require an account.
          When you click a coupon or deal, we may earn a commission if you
          make a purchase, at no additional cost to you. This is how we keep
          the site running and free for shoppers. Read our{" "}
          <a href="/affiliate-disclosure" className="text-brand-600 underline">
            Affiliate Disclosure
          </a>{" "}
          for more details.
        </p>
        <p>
          We do our best to keep coupon information accurate, but discounts
          and terms are set by individual retailers and can change without
          notice. Always confirm the final price at checkout before
          completing your purchase.
        </p>
      </div>
    </div>
  );
}

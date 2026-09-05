import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CouponGrid from "@/components/CouponGrid";
import { getBigDeals } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Best Deals",
  description:
    "The standout deals right now: big percentage-off and fixed-amount discounts, free shipping offers and BOGO deals from top stores.",
  alternates: { canonical: "/deals" },
  openGraph: {
    title: "Best Deals",
    description:
      "The standout deals right now: big discounts, free shipping and BOGO offers from top stores.",
    url: "/deals",
  },
};

export default function DealsPage() {
  const deals = getBigDeals();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Deals" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        Best Deals Right Now
      </h1>
      <p className="mt-2 max-w-2xl text-gray-600">
        A curated selection of the biggest discounts, free shipping offers
        and bundle deals across every store we track.
      </p>
      <div className="mt-8">
        <CouponGrid
          coupons={deals}
          emptyTitle="No standout deals right now"
          emptyDescription="Check back soon — we add new deals regularly."
        />
      </div>
    </div>
  );
}

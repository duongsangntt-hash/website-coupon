import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CouponsExplorer from "@/components/CouponsExplorer";
import { getActiveCoupons } from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Coupons & Promo Codes",
  description: `Browse all active coupon codes, promo codes and deals from every store on ${SITE_NAME}, filterable by type and sortable by discount, date or popularity.`,
  alternates: { canonical: "/coupons" },
  openGraph: {
    title: "All Coupons & Promo Codes",
    description: `Browse all active coupon codes, promo codes and deals from every store on ${SITE_NAME}.`,
    url: "/coupons",
  },
};

export default function CouponsPage() {
  const coupons = getActiveCoupons();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Coupons" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        All Coupons &amp; Promo Codes
      </h1>
      <p className="mt-2 max-w-2xl text-gray-600">
        Filter, sort and search every active coupon we track.
      </p>
      <div className="mt-8">
        <CouponsExplorer coupons={coupons} />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoresExplorer from "@/components/StoresExplorer";
import { stores } from "@/data/stores";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Stores - Browse Coupons by Store",
  description: `Browse all stores on ${SITE_NAME} and find verified coupon codes, promo codes and deals for each one.`,
  alternates: { canonical: "/stores" },
  openGraph: {
    title: "All Stores - Browse Coupons by Store",
    description: `Browse all stores on ${SITE_NAME} and find verified coupon codes, promo codes and deals for each one.`,
    url: "/stores",
  },
};

export default function StoresPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Stores" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        All Stores
      </h1>
      <p className="mt-2 max-w-2xl text-gray-600">
        Browse every store we track and jump straight to their latest coupons
        and deals.
      </p>
      <div className="mt-8">
        <StoresExplorer stores={stores} />
      </div>
    </div>
  );
}

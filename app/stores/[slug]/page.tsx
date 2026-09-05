import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { stores } from "@/data/stores";
import {
  getStoreBySlug,
  getCouponsByStore,
  getCategoryBySlug,
  getBestDiscountLabelForStore,
  formatDate,
} from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoreLogo from "@/components/StoreLogo";
import CouponGrid from "@/components/CouponGrid";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return stores.map((store) => ({ slug: store.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) return {};

  const title = `${store.name} Coupons & Promo Codes 2026`;
  const description = `Save with the latest ${store.name} coupon codes, promo codes and deals, verified and updated regularly on ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: { canonical: `/stores/${store.slug}` },
    openGraph: { title, description, url: `/stores/${store.slug}` },
  };
}

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = getStoreBySlug(slug);
  if (!store) notFound();

  const activeCoupons = getCouponsByStore(store.slug, true);
  const allCoupons = getCouponsByStore(store.slug, false);
  const expiredCoupons = allCoupons.filter(
    (c) => !activeCoupons.some((a) => a.id === c.id)
  );
  const category = getCategoryBySlug(store.category);
  const bestDiscount = getBestDiscountLabelForStore(store.slug);
  const lastUpdated = allCoupons.reduce<string | null>((latest, c) => {
    if (!latest) return c.createdAt;
    return new Date(c.createdAt) > new Date(latest) ? c.createdAt : latest;
  }, null);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${store.name} Coupons`,
    itemListElement: activeCoupons.map((c, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: c.title,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={itemListJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Stores", href: "/stores" },
          { label: store.name },
        ]}
      />

      <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <StoreLogo src={store.logo} alt={`${store.name} logo`} size={72} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Best {store.name} Coupons &amp; Deals
          </h1>
          <p className="mt-1 max-w-2xl text-gray-600">{store.description}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-card">
          <p className="text-2xl font-extrabold text-brand-700">
            {activeCoupons.length}
          </p>
          <p className="mt-1 text-xs font-medium text-gray-500">Active Coupons</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-card">
          <p className="text-2xl font-extrabold text-savings-600">
            {bestDiscount ?? "—"}
          </p>
          <p className="mt-1 text-xs font-medium text-gray-500">Best Discount</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-card">
          <p className="truncate text-lg font-extrabold text-gray-900">
            {category?.name ?? "General"}
          </p>
          <p className="mt-1 text-xs font-medium text-gray-500">Category</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-card">
          <p className="text-lg font-extrabold text-gray-900">
            {lastUpdated ? formatDate(lastUpdated) : "—"}
          </p>
          <p className="mt-1 text-xs font-medium text-gray-500">Last Updated</p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {store.name} Coupons
        </h2>
        <div className="mt-6">
          <CouponGrid
            coupons={activeCoupons}
            emptyTitle={`No active ${store.name} coupons right now`}
            emptyDescription="Check back soon — we add new coupons regularly."
          />
        </div>
      </section>

      {expiredCoupons.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-gray-500">
            Expired {store.name} Coupons
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            These offers have expired but may still work for some shoppers.
          </p>
          <div className="mt-6 opacity-60">
            <CouponGrid coupons={expiredCoupons} />
          </div>
        </section>
      )}
    </div>
  );
}

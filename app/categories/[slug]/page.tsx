import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import {
  getCategoryBySlug,
  getCouponsByCategory,
  getStoresByCategory,
  getStoreCountForCategory,
} from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryIcon from "@/components/CategoryIcon";
import CouponGrid from "@/components/CouponGrid";
import StoreGrid from "@/components/StoreGrid";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  const title = `Best ${category.name} Coupons & Deals 2026`;
  const description = `Find the best ${category.name.toLowerCase()} coupon codes, promo codes and deals, verified and updated regularly on ${SITE_NAME}.`;
  const isEmpty = getStoreCountForCategory(category.slug) === 0;

  return {
    title,
    description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: { title, description, url: `/categories/${category.slug}` },
    // Not linked from nav/sitemap while empty; noindex as a safety net in
    // case the URL is reached directly, so Google never sees a thin page.
    ...(isEmpty && { robots: { index: false, follow: true } }),
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryCoupons = getCouponsByCategory(category.slug);
  const featuredCoupons = categoryCoupons.filter((c) => c.featured);
  const latestCoupons = [...categoryCoupons].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const categoryStores = getStoresByCategory(category.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      <div className="mt-4 flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <CategoryIcon name={category.icon} className="h-7 w-7" />
        </span>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Best {category.name} Coupons &amp; Deals
          </h1>
          <p className="mt-1 max-w-2xl text-gray-600">{category.description}</p>
        </div>
      </div>

      {featuredCoupons.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Featured Deals
          </h2>
          <div className="mt-6">
            <CouponGrid coupons={featuredCoupons} />
          </div>
        </section>
      )}

      {categoryStores.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Popular Stores
          </h2>
          <div className="mt-6">
            <StoreGrid stores={categoryStores} />
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Latest {category.name} Coupons
        </h2>
        <div className="mt-6">
          <CouponGrid
            coupons={latestCoupons}
            emptyTitle={`No ${category.name} coupons yet`}
            emptyDescription="Check back soon — we add new coupons regularly."
          />
        </div>
      </section>
    </div>
  );
}

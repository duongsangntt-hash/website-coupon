import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryGrid from "@/components/CategoryGrid";
import { getCategoriesWithStores } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop Coupons by Category",
  description:
    "Browse coupons and deals by category, from electronics and fashion to automotive and outdoor gear.",
  alternates: { canonical: "/categories" },
  openGraph: {
    title: "Shop Coupons by Category",
    description:
      "Browse coupons and deals by category, from electronics and fashion to automotive and outdoor gear.",
    url: "/categories",
  },
};

export default function CategoriesPage() {
  const categories = getCategoriesWithStores();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Categories" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        Shop by Category
      </h1>
      <p className="mt-2 max-w-2xl text-gray-600">
        Find coupons and deals organized by the categories you shop most.
      </p>
      <div className="mt-8">
        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
}

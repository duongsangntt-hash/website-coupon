import Link from "next/link";
import { Category } from "@/lib/types";
import { getCouponCountForCategory, getStoreCountForCategory } from "@/lib/utils";
import CategoryIcon from "@/components/CategoryIcon";

export default function CategoryCard({ category }: { category: Category }) {
  const storeCount = getStoreCountForCategory(category.slug);
  const couponCount = getCouponCountForCategory(category.slug);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <CategoryIcon name={category.icon} className="h-7 w-7" />
      </span>
      <span className="mt-3 text-sm font-bold text-gray-900">{category.name}</span>
      <span className="mt-1 text-xs text-gray-500">
        {storeCount} {storeCount === 1 ? "Store" : "Stores"} · {couponCount}{" "}
        {couponCount === 1 ? "Coupon" : "Coupons"}
      </span>
    </Link>
  );
}

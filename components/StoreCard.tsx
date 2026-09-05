import Link from "next/link";
import { Store } from "@/lib/types";
import { getActiveCouponCountForStore, getCategoryBySlug } from "@/lib/utils";
import StoreLogo from "@/components/StoreLogo";
import CTAButton from "@/components/CTAButton";

export default function StoreCard({ store }: { store: Store }) {
  const couponCount = getActiveCouponCountForStore(store.slug);
  const category = getCategoryBySlug(store.category);

  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-card transition-shadow hover:shadow-card-hover">
      <Link href={`/stores/${store.slug}`}>
        <StoreLogo src={store.logo} alt={`${store.name} logo`} size={64} />
      </Link>
      <Link
        href={`/stores/${store.slug}`}
        className="mt-3 text-base font-bold text-gray-900 hover:text-brand-700"
      >
        {store.name}
      </Link>
      {category && (
        <span className="mt-1 text-xs font-medium text-gray-500">
          {category.name}
        </span>
      )}
      <span className="mt-2 rounded-full bg-savings-50 px-3 py-1 text-xs font-semibold text-savings-700">
        {couponCount} Active {couponCount === 1 ? "Deal" : "Deals"}
      </span>
      <CTAButton
        href={`/stores/${store.slug}`}
        variant="outline"
        size="sm"
        className="mt-4 w-full"
      >
        View Deals
      </CTAButton>
    </div>
  );
}

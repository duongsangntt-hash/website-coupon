import { Percent, Tag, Truck, type LucideIcon } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { getFeaturedCoupons, getStoreBySlug } from "@/lib/utils";

const TYPE_ICON: Record<string, LucideIcon> = {
  percentage: Percent,
  "fixed-amount": Tag,
  "free-shipping": Truck,
  deal: Tag,
};

const TYPE_BG: Record<string, string> = {
  percentage: "bg-savings-50 text-savings-600",
  "fixed-amount": "bg-brand-50 text-brand-600",
  "free-shipping": "bg-amber-50 text-amber-600",
  deal: "bg-brand-50 text-brand-600",
};

const CARD_OFFSETS = ["ml-10", "", "ml-6"];

export default function Hero() {
  const highlightCoupons = getFeaturedCoupons().slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            Updated deals, every day
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Find the Best Coupons &amp; Deals
          </h1>
          <p className="mt-4 max-w-xl text-base text-gray-600 sm:text-lg">
            Save money with verified promo codes, exclusive discounts and
            deals from popular online stores.
          </p>
          <div className="mt-8 max-w-lg">
            <SearchBar size="lg" />
          </div>
        </div>

        {highlightCoupons.length > 0 && (
          <div className="relative hidden lg:block">
            <div className="ml-auto flex max-w-sm flex-col gap-4">
              {highlightCoupons.map((coupon, index) => {
                const store = getStoreBySlug(coupon.storeId);
                const Icon = TYPE_ICON[coupon.type] ?? Tag;
                const iconBg = TYPE_BG[coupon.type] ?? TYPE_BG.deal;
                return (
                  <div
                    key={coupon.id}
                    className={`${CARD_OFFSETS[index % CARD_OFFSETS.length]} flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-card-hover`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {coupon.discount} {store?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {coupon.code ? `Code: ${coupon.code}` : "No code required"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

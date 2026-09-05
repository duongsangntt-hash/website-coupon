"use client";

import { useMemo, useState } from "react";
import { Coupon } from "@/lib/types";
import { getStoreBySlug, daysUntil, parseDiscountValue } from "@/lib/utils";
import CouponGrid from "@/components/CouponGrid";

type FilterKey =
  | "all"
  | "promo-codes"
  | "deals"
  | "free-shipping"
  | "percentage"
  | "fixed-amount";

type SortKey = "discount" | "newest" | "expiring" | "popular";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "promo-codes", label: "Promo Codes" },
  { key: "deals", label: "Deals" },
  { key: "free-shipping", label: "Free Shipping" },
  { key: "percentage", label: "Percentage Off" },
  { key: "fixed-amount", label: "Fixed Amount Off" },
];

const SORTS: { key: SortKey; label: string }[] = [
  { key: "discount", label: "Highest Discount" },
  { key: "newest", label: "Newest" },
  { key: "expiring", label: "Expiring Soon" },
  { key: "popular", label: "Popular" },
];

const PAGE_SIZE = 12;

function matchesFilter(coupon: Coupon, filter: FilterKey): boolean {
  switch (filter) {
    case "promo-codes":
      return !!coupon.code;
    case "deals":
      return !coupon.code;
    case "free-shipping":
      return coupon.type === "free-shipping";
    case "percentage":
      return coupon.type === "percentage";
    case "fixed-amount":
      return coupon.type === "fixed-amount";
    default:
      return true;
  }
}

export default function CouponsExplorer({ coupons }: { coupons: Coupon[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = coupons.filter((c) => matchesFilter(c, filter));

    if (q) {
      result = result.filter((c) => {
        const store = getStoreBySlug(c.storeId);
        return (
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          store?.name.toLowerCase().includes(q)
        );
      });
    }

    const sorted = [...result];
    switch (sort) {
      case "discount":
        sorted.sort(
          (a, b) => parseDiscountValue(b.discount) - parseDiscountValue(a.discount)
        );
        break;
      case "expiring":
        sorted.sort((a, b) => {
          if (!a.expires && !b.expires) return 0;
          if (!a.expires) return 1;
          if (!b.expires) return -1;
          return daysUntil(a.expires) - daysUntil(b.expires);
        });
        break;
      case "popular":
        sorted.sort((a, b) => Number(!!b.popular) - Number(!!a.popular));
        break;
      case "newest":
      default:
        sorted.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return sorted;
  }, [coupons, filter, sort, query]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder="Search coupons..."
          aria-label="Search coupons"
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-400 focus:outline-none sm:max-w-xs"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          aria-label="Sort coupons"
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none sm:w-auto"
        >
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              Sort: {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => {
              setFilter(f.key);
              setVisibleCount(PAGE_SIZE);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              filter === f.key
                ? "bg-brand-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? "coupon" : "coupons"} found
      </p>

      <div className="mt-4">
        <CouponGrid coupons={visible} />
      </div>

      {visibleCount < filtered.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:border-brand-300 hover:text-brand-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Store } from "@/lib/types";
import { getActiveCouponCountForStore } from "@/lib/utils";
import StoreGrid from "@/components/StoreGrid";

type SortKey = "az" | "popular" | "latest";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Most Popular" },
  { key: "az", label: "A-Z" },
  { key: "latest", label: "Latest" },
];

export default function StoresExplorer({ stores }: { stores: Store[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = q
      ? stores.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q)
        )
      : [...stores];

    switch (sort) {
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "latest":
        result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "popular":
      default:
        result.sort(
          (a, b) =>
            getActiveCouponCountForStore(b.slug) - getActiveCouponCountForStore(a.slug)
        );
        break;
    }

    return result;
  }, [stores, query, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stores..."
          aria-label="Search stores"
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-400 focus:outline-none sm:max-w-xs"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          aria-label="Sort stores"
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none sm:w-auto"
        >
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              Sort: {s.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? "store" : "stores"} found
      </p>

      <div className="mt-4">
        <StoreGrid stores={filtered} />
      </div>
    </div>
  );
}

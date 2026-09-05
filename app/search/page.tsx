import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import StoreGrid from "@/components/StoreGrid";
import CouponGrid from "@/components/CouponGrid";
import SearchBar from "@/components/SearchBar";
import { searchSite } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Search Results",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = searchSite(query);
  const hasResults = results.stores.length > 0 || results.coupons.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Search" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        Search Results
      </h1>
      <div className="mt-4 max-w-lg">
        <SearchBar size="md" />
      </div>

      {query && (
        <p className="mt-4 text-sm text-gray-500">
          {hasResults ? "Showing" : "No"} results for &quot;{query}&quot;
        </p>
      )}

      {!query && (
        <p className="mt-4 text-sm text-gray-500">
          Enter a store name, brand, or keyword above to search.
        </p>
      )}

      {query && results.stores.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
            Stores
          </h2>
          <div className="mt-4">
            <StoreGrid stores={results.stores} />
          </div>
        </section>
      )}

      {query && results.coupons.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
            Coupons
          </h2>
          <div className="mt-4">
            <CouponGrid coupons={results.coupons} />
          </div>
        </section>
      )}

      {query && !hasResults && (
        <div className="mt-8">
          <CouponGrid
            coupons={[]}
            emptyTitle="No matches found"
            emptyDescription="Try a different store name, brand, or keyword."
          />
        </div>
      )}
    </div>
  );
}

import { stores } from "@/data/stores";
import { coupons } from "@/data/coupons";
import { categories } from "@/data/categories";
import { Coupon, Store, Category } from "@/lib/types";

/** Coupons with no expiry date are treated as ongoing/evergreen offers. */
export function isCouponActive(coupon: Coupon, now: Date = new Date()): boolean {
  if (!coupon.expires) return true;
  const expiryDate = new Date(`${coupon.expires}T23:59:59`);
  return expiryDate.getTime() >= now.getTime();
}

export function getActiveCoupons(): Coupon[] {
  return coupons.filter((c) => isCouponActive(c));
}

export function getExpiredCoupons(): Coupon[] {
  return coupons.filter((c) => !isCouponActive(c));
}

export function getStoreBySlug(slug: string): Store | undefined {
  return stores.find((s) => s.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCouponsByStore(storeSlug: string, activeOnly = true): Coupon[] {
  const list = activeOnly ? getActiveCoupons() : coupons;
  return list.filter((c) => c.storeId === storeSlug);
}

export function getCouponsByCategory(categorySlug: string, activeOnly = true): Coupon[] {
  const list = activeOnly ? getActiveCoupons() : coupons;
  return list.filter((c) => c.category === categorySlug);
}

export function getActiveCouponCountForStore(storeSlug: string): number {
  return getCouponsByStore(storeSlug).length;
}

export function getStoresByCategory(categorySlug: string): Store[] {
  return stores.filter((s) => s.category === categorySlug);
}

export function getStoreCountForCategory(categorySlug: string): number {
  return getStoresByCategory(categorySlug).length;
}

/** Categories with at least one store, in the order defined in data/categories.ts.
 * Empty categories are excluded from navigation and the sitemap to avoid thin pages. */
export function getCategoriesWithStores(): Category[] {
  return categories.filter((c) => getStoreCountForCategory(c.slug) > 0);
}

export function getCouponCountForCategory(categorySlug: string): number {
  return getCouponsByCategory(categorySlug).length;
}

export function getFeaturedCoupons(): Coupon[] {
  return getActiveCoupons().filter((c) => c.featured);
}

export function getPopularCoupons(): Coupon[] {
  return getActiveCoupons().filter((c) => c.popular);
}

export function parseDiscountValue(discount: string): number {
  const match = discount.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

/** Curated "big win" offers for the Deals page: standout percentage/fixed
 * discounts, free shipping, and other no-code deals like BOGO bundles. */
export function getBigDeals(): Coupon[] {
  return getActiveCoupons().filter((c) => {
    if (c.featured || c.popular) return true;
    if (c.type === "deal" || c.type === "free-shipping") return true;
    const value = parseDiscountValue(c.discount);
    if (c.type === "percentage") return value >= 20;
    if (c.type === "fixed-amount") return value >= 50;
    return false;
  });
}

export function getPopularStores(): Store[] {
  return [...stores].sort(
    (a, b) => getActiveCouponCountForStore(b.slug) - getActiveCouponCountForStore(a.slug)
  );
}

export function getBestDiscountLabelForStore(storeSlug: string): string | null {
  const storeCoupons = getCouponsByStore(storeSlug);
  if (storeCoupons.length === 0) return null;
  const featured = storeCoupons.find((c) => c.featured);
  return (featured ?? storeCoupons[0]).discount;
}

export function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function daysUntil(dateStr: string, now: Date = new Date()): number {
  const target = new Date(`${dateStr}T23:59:59`);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export type SearchResult = {
  stores: Store[];
  coupons: Coupon[];
};

export function searchSite(query: string): SearchResult {
  const q = query.trim().toLowerCase();
  if (!q) return { stores: [], coupons: [] };

  const matchedStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  );

  const matchedCoupons = getActiveCoupons().filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      getStoreBySlug(c.storeId)?.name.toLowerCase().includes(q)
  );

  return { stores: matchedStores, coupons: matchedCoupons };
}

/**
 * Outbound affiliate click tracking hook. No-op until an analytics
 * provider (GA4, GTM, Meta Pixel, etc.) is configured on window.
 */
export function trackAffiliateClick(coupon: Coupon): void {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };

  if (typeof w.gtag === "function") {
    w.gtag("event", "affiliate_click", {
      store_id: coupon.storeId,
      coupon_id: coupon.id,
      coupon_title: coupon.title,
    });
  }

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({
      event: "affiliate_click",
      store_id: coupon.storeId,
      coupon_id: coupon.id,
      coupon_title: coupon.title,
    });
  }
}

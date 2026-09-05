export const SITE_NAME = "Save More With Coupons";
export const SITE_TAGLINE = "Find Better Deals. Save More.";
export const SITE_DESCRIPTION =
  "Save More With Coupons helps you discover verified coupon codes, promo codes, discounts and deals from your favorite online stores, updated regularly so you can save more on every order.";
export const SITE_EMAIL = "support@savemorewithcoupons.com";

// Can be overridden per-environment via NEXT_PUBLIC_SITE_URL (e.g. a staging
// domain). Used to build canonical URLs, Open Graph tags, and the sitemap.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://savemorewithcoupons.com";

export const SITE_LOCALE = "en_US";
export const SITE_CURRENCY = "USD";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Stores", href: "/stores" },
  { label: "Coupons", href: "/coupons" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
  { label: "Blog", href: "/blog" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export const FOOTER_COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

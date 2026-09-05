import type { MetadataRoute } from "next";
import { stores } from "@/data/stores";
import { blogPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/site";
import { getCategoriesWithStores } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/stores`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/coupons`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/deals`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/affiliate-disclosure`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const storeRoutes: MetadataRoute.Sitemap = stores.map((store) => ({
    url: `${SITE_URL}/stores/${store.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getCategoriesWithStores().map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...storeRoutes, ...categoryRoutes, ...blogRoutes];
}

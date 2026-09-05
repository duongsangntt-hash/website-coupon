import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blog";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog - Shopping Tips & Money-Saving Guides",
  description:
    "Guides and tips on finding coupons, understanding promo codes, and saving money when you shop online.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog - Shopping Tips & Money-Saving Guides",
    description:
      "Guides and tips on finding coupons, understanding promo codes, and saving money when you shop online.",
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
        {SITE_NAME} Blog
      </h1>
      <p className="mt-2 max-w-2xl text-gray-600">
        Tips and guides to help you find better deals and save money online.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

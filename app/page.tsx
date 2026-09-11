import Hero from "@/components/Hero";
import TrustSection from "@/components/TrustSection";
import CouponGrid from "@/components/CouponGrid";
import StoreGrid from "@/components/StoreGrid";
import CategoryGrid from "@/components/CategoryGrid";
import BlogCard from "@/components/BlogCard";
import CTAButton from "@/components/CTAButton";
import { getActiveCoupons, getPopularStores, getCategoriesWithStores } from "@/lib/utils";
import { blogPosts } from "@/data/blog";

export default function HomePage() {
  const allCoupons = getActiveCoupons();
  const popularStores = getPopularStores().slice(0, 8);
  const topCategories = getCategoriesWithStores().slice(0, 10);
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      {/* Impact.com affiliate network site-ownership verification. Their
          tag uses a non-standard `value` attribute (not `content`), so this
          is rendered directly instead of through the Metadata API — React 19
          hoists <meta> tags rendered anywhere in the tree into <head>. */}
      {/* @ts-expect-error -- `value` is non-standard for <meta>, but it's what Impact.com's crawler checks for */}
      <meta name="impact-site-verification" value="dfab132a-bcf6-424c-95b6-b337bedea449" />
      <Hero />
      <TrustSection />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          🔥 Today&apos;s Best Deals
        </h2>
        <div className="mt-6">
          <CouponGrid coupons={allCoupons} />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Popular Stores
            </h2>
            <CTAButton href="/stores" variant="outline" size="sm" showArrow>
              View All
            </CTAButton>
          </div>
          <div className="mt-6">
            <StoreGrid stores={popularStores} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Browse by Category
          </h2>
          <CTAButton href="/categories" variant="outline" size="sm" showArrow>
            View All
          </CTAButton>
        </div>
        <div className="mt-6">
          <CategoryGrid categories={topCategories} />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              From the Blog
            </h2>
            <CTAButton href="/blog" variant="outline" size="sm" showArrow>
              View All
            </CTAButton>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

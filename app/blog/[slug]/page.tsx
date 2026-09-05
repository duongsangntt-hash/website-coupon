import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={articleJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-brand-600">
        {post.category}
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
        <span>{post.author}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.image}
        alt={post.title}
        className="mt-6 w-full rounded-2xl object-cover"
      />

      <div className="mt-8">
        {post.content.map((paragraph, index) => (
          <p key={index} className="mb-4 leading-relaxed text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>

      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-gray-100 pt-10">
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
            More from the Blog
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedPosts.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

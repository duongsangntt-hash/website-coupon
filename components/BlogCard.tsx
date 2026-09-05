import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        {/* Local SVG placeholder image; next/image cannot optimize SVG. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="aspect-[16/9] w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {post.category}
        </span>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mt-2 text-base font-bold leading-snug text-gray-900 hover:text-brand-700">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>{formatDate(post.date)}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}

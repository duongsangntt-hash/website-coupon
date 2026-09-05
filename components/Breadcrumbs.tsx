import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { label: "Home", href: "/" },
      ...items,
    ].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href ?? ""}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-gray-500">
        <li className="flex items-center gap-1.5">
          <Link href="/" className="flex items-center hover:text-brand-700">
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-700">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-700">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}

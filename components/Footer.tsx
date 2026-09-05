import Link from "next/link";
import { Tag, Mail } from "lucide-react";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_EMAIL,
  NAV_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_COMPANY_LINKS,
} from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-1.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                <Tag className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                {SITE_NAME}
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">{SITE_TAGLINE}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-700"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {SITE_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6">
          <p className="text-xs leading-relaxed text-gray-400">
            {SITE_NAME} is a coupon and deal discovery website. We may earn a
            commission from qualifying purchases made through links on this
            website, at no additional cost to you. See our{" "}
            <Link href="/affiliate-disclosure" className="underline hover:text-gray-600">
              Affiliate Disclosure
            </Link>{" "}
            for details.
          </p>
          <p className="mt-3 text-xs text-gray-400">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

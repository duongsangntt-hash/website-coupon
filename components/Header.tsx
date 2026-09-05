"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, Tag } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/site";
import SearchBar from "@/components/SearchBar";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Tag className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "text-brand-700"
                    : "text-gray-600 hover:text-brand-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden w-64 md:block">
            {searchOpen ? (
              <SearchBar size="md" />
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex w-full items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-400 hover:border-gray-300"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Search
              </button>
            )}
          </div>

          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-50 md:hidden"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-50 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-gray-100 px-4 py-3 md:hidden">
          <SearchBar size="md" />
        </div>
      )}

      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-gray-100 px-4 py-3 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

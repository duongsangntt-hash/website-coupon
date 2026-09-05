"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  size = "md",
  placeholder = "Search stores, brands or coupons...",
  className = "",
}: {
  size?: "md" | "lg";
  placeholder?: string;
  className?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  const isLarge = size === "lg";

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-white shadow-card ${
        isLarge ? "p-2" : "p-1"
      } ${className}`}
    >
      <Search
        className={`ml-2 shrink-0 text-gray-400 ${isLarge ? "h-5 w-5" : "h-4 w-4"}`}
        aria-hidden="true"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search stores, brands or coupons"
        className={`w-full flex-1 border-none bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 ${
          isLarge ? "text-base py-2" : "text-sm py-1.5"
        }`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-lg bg-brand-600 font-semibold text-white transition-colors hover:bg-brand-700 ${
          isLarge ? "px-5 py-2.5 text-sm" : "px-3.5 py-1.5 text-xs"
        }`}
      >
        Search
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Check, Copy, ArrowRight } from "lucide-react";
import { Coupon } from "@/lib/types";
import { trackAffiliateClick } from "@/lib/utils";

export default function CopyCodeButton({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    trackAffiliateClick(coupon);
    if (coupon.code) {
      try {
        await navigator.clipboard.writeText(coupon.code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard API unavailable; the code is still visible for manual copy.
      }
    }
  };

  if (!coupon.code) {
    return (
      <a
        href={coupon.affiliateUrl}
        target="_blank"
        rel="sponsored nofollow noopener"
        onClick={handleClick}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Get Deal
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <a
      href={coupon.affiliateUrl}
      target="_blank"
      rel="sponsored nofollow noopener"
      onClick={handleClick}
      className="group flex w-full items-stretch overflow-hidden rounded-lg border-2 border-dashed border-brand-300 bg-brand-50 transition-colors hover:border-brand-400"
      aria-label={`Copy code ${coupon.code} and get deal at store`}
    >
      <span className="flex flex-1 items-center justify-center px-3 py-2.5 font-mono text-sm font-bold tracking-wide text-brand-700">
        {coupon.code}
      </span>
      <span className="flex items-center gap-1.5 border-l-2 border-dashed border-brand-300 bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-brand-700">
        {copied ? (
          <>
            <Check className="h-4 w-4" aria-hidden="true" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" aria-hidden="true" />
            Get Deal
          </>
        )}
      </span>
    </a>
  );
}

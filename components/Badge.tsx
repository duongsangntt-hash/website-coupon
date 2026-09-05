import { BadgeCheck, Flame, Star, Timer } from "lucide-react";
import { ReactNode } from "react";

type BadgeVariant = "verified" | "featured" | "popular" | "expiring";

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  verified: "bg-brand-50 text-brand-700",
  featured: "bg-amber-50 text-amber-700",
  popular: "bg-rose-50 text-rose-700",
  expiring: "bg-orange-50 text-orange-700",
};

const VARIANT_ICON: Record<BadgeVariant, ReactNode> = {
  verified: <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />,
  featured: <Star className="h-3.5 w-3.5" aria-hidden="true" />,
  popular: <Flame className="h-3.5 w-3.5" aria-hidden="true" />,
  expiring: <Timer className="h-3.5 w-3.5" aria-hidden="true" />,
};

const VARIANT_LABEL: Record<BadgeVariant, string> = {
  verified: "Verified",
  featured: "Exclusive",
  popular: "Popular",
  expiring: "Limited Time",
};

export default function Badge({ variant }: { variant: BadgeVariant }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${VARIANT_STYLES[variant]}`}
    >
      {VARIANT_ICON[variant]}
      {VARIANT_LABEL[variant]}
    </span>
  );
}

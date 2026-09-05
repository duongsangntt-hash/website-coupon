import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-card-hover",
  secondary: "bg-savings-500 text-white hover:bg-savings-600 shadow-sm",
  outline:
    "border border-gray-200 text-gray-700 hover:border-brand-300 hover:text-brand-700 bg-white",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  showArrow?: boolean;
  className?: string;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  showArrow = false,
  className = "",
}: CTAButtonProps) {
  const classes = `inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg font-semibold transition-colors duration-150 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener"
        className={classes}
      >
        {children}
        {showArrow && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {showArrow && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
    </Link>
  );
}

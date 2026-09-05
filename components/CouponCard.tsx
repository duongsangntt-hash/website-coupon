import Link from "next/link";
import { Clock } from "lucide-react";
import { Coupon, Store } from "@/lib/types";
import { daysUntil, formatDate } from "@/lib/utils";
import StoreLogo from "@/components/StoreLogo";
import Badge from "@/components/Badge";
import CopyCodeButton from "@/components/CopyCodeButton";

export default function CouponCard({
  coupon,
  store,
}: {
  coupon: Coupon;
  store: Store;
}) {
  const expiringSoon =
    !!coupon.expires && daysUntil(coupon.expires) <= 5 && daysUntil(coupon.expires) >= 0;

  return (
    <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-center gap-3">
        <StoreLogo src={store.logo} alt={`${store.name} logo`} size={48} />
        <div className="min-w-0">
          <Link
            href={`/stores/${store.slug}`}
            className="block truncate text-sm font-semibold text-gray-900 hover:text-brand-700"
          >
            {store.name}
          </Link>
          <span className="text-xs text-gray-500">{coupon.discount}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {coupon.featured && <Badge variant="featured" />}
        {coupon.verified && <Badge variant="verified" />}
        {coupon.popular && <Badge variant="popular" />}
        {expiringSoon && <Badge variant="expiring" />}
      </div>

      <h3 className="mt-3 text-base font-bold leading-snug text-gray-900">
        {coupon.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-gray-600">
        {coupon.description}
      </p>

      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {coupon.expires ? (
          <span>Expires {formatDate(coupon.expires)}</span>
        ) : (
          <span>Ongoing offer</span>
        )}
      </div>

      <div className="mt-4">
        <CopyCodeButton coupon={coupon} />
      </div>
    </article>
  );
}

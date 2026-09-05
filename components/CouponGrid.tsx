import { Coupon } from "@/lib/types";
import { getStoreBySlug } from "@/lib/utils";
import CouponCard from "@/components/CouponCard";
import EmptyState from "@/components/EmptyState";

export default function CouponGrid({
  coupons,
  emptyTitle = "No coupons found",
  emptyDescription = "Check back soon — we add new coupons regularly.",
}: {
  coupons: Coupon[];
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  if (coupons.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {coupons.map((coupon) => {
        const store = getStoreBySlug(coupon.storeId);
        if (!store) return null;
        return <CouponCard key={coupon.id} coupon={coupon} store={store} />;
      })}
    </div>
  );
}

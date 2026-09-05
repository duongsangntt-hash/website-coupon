import { Store } from "@/lib/types";
import StoreCard from "@/components/StoreCard";
import EmptyState from "@/components/EmptyState";

export default function StoreGrid({ stores }: { stores: Store[] }) {
  if (stores.length === 0) {
    return (
      <EmptyState
        title="No stores found"
        description="Try a different search term."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}

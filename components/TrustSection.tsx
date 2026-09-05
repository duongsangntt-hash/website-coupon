import { BadgeCheck, RefreshCw, Store, Gift } from "lucide-react";

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "Verified Deals",
    description: "Coupons are checked before they're published.",
  },
  {
    icon: RefreshCw,
    title: "Updated Offers",
    description: "New coupons and deals added on a regular basis.",
  },
  {
    icon: Store,
    title: "Top Online Stores",
    description: "Curated selection of popular shops across categories.",
  },
  {
    icon: Gift,
    title: "Free to Use",
    description: "No account, no sign-up — just click and save.",
  },
];

export default function TrustSection() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <feature.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">{feature.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

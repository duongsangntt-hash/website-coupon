import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "No results found",
  description = "Try adjusting your search or filters.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
      <SearchX className="h-10 w-10 text-gray-300" aria-hidden="true" />
      <h3 className="mt-4 text-base font-semibold text-gray-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-gray-500">{description}</p>
    </div>
  );
}

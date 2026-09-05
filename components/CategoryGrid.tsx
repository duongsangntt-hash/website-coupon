import { Category } from "@/lib/types";
import CategoryCard from "@/components/CategoryCard";

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

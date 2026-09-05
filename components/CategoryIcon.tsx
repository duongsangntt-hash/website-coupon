import {
  Laptop,
  Shirt,
  Sparkles,
  Home,
  Trophy,
  Car,
  Plane,
  Code2,
  Watch,
  Dumbbell,
  Mountain,
  Baby,
  PawPrint,
  Gem,
  Wrench,
  Tag,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Laptop,
  Shirt,
  Sparkles,
  Home,
  Trophy,
  Car,
  Plane,
  Code2,
  Watch,
  Dumbbell,
  Mountain,
  Baby,
  PawPrint,
  Gem,
  Wrench,
};

export default function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICON_MAP[name] ?? Tag;
  return <Icon className={className} aria-hidden="true" />;
}

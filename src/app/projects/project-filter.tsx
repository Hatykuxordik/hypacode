"use client";

import { Button } from "@/components/ui/button";

interface Category {
  id: string | number;
  name: string;
  count: number;
}

interface ProjectFilterProps {
  categories: Category[];
  selectedCategory: string | number | null;
  onSelect: (categoryId: string | number) => void;
}

export default function ProjectFilter({
  categories,
  selectedCategory,
  onSelect,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selectedCategory === cat.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(cat.id)}
        >
          {cat.name} ({cat.count})
        </Button>
      ))}
    </div>
  );
}

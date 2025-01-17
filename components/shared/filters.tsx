"use client";
import React, { use } from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { Check } from "lucide-react";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();
  const items = ingredients.map((ingredient) => ({ text: ingredient.name, value: ingredient.id.toString() }));

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="font-bold mb-5" />

      {/* Upper checkboxes */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Can be collected" value="1" />
        <FilterCheckbox text="New" value="2" />
      </div>

      {/* Price range */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from to:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={100} defaultValue={0} />
          <Input type="number" min={100} max={100} placeholder="100" />
        </div>
        <RangeSlider min={0} max={100} step={1} />
      </div>

      {/* Ingredients filter*/}
      <CheckboxFiltersGroup title="Ingredients" name={"ingredients"} className="mt-5" limit={6} defaultItems={items.slice(0, 6)} items={items} loading={loading} onClickCheckbox={onAddId} selectedIds={selectedIds} />
    </div>
  );
};

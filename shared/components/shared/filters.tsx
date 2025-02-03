"use client";
import React, { use } from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useQueryFilters, useIngredients, useFilters } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((ingredient) => ({ text: ingredient.name, value: ingredient.id.toString() }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="font-bold mb-5" />

      {/* Upper checkboxes */}
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mb-5"
        title="Pizza types"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: "Slim", value: "1" },
          { text: "Original", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="Sizes"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: "20 cm", value: "20" },
          { text: "30 cm", value: "30" },
          { text: "40 cm", value: "40" },
        ]}
      />

      {/* Price range */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={filters.prices.priceTo}
            value={String(filters.prices.priceFrom)}
            onChange={(e) => {
              filters.setPrices("priceFrom", Number(e.target.value));
            }}
          />
          <Input
            type="number"
            className="appearance-none"
            placeholder="100"
            min={filters.prices.priceFrom}
            max={100}
            value={String(filters.prices.priceTo)}
            onChange={(e) => {
              filters.setPrices("priceTo", Number(e.target.value));
            }}
          />
        </div>
        <RangeSlider min={0} max={100} step={10} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 100]} onValueChange={updatePrices} />
      </div>

      {/* Ingredients filter*/}
      <CheckboxFiltersGroup
        title="Ingredients"
        name={"ingredients"}
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};

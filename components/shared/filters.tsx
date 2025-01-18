"use client";
import React, { use } from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { Check } from "lucide-react";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();
  const [prices, setPrice] = React.useState<PriceProps>({ priceFrom: 0, priceTo: 100 });
  const items = ingredients.map((ingredient) => ({ text: ingredient.name, value: ingredient.id.toString() }));
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>());
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>());

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    });
  };

  React.useEffect(() => {
    console.log({ sizes, pizzaTypes, prices, selectedIngredients });
  }, [sizes, pizzaTypes, prices, selectedIngredients]);

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="font-bold mb-5" />

      {/* Upper checkboxes */}
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mb-5"
        title="Pizza types"
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: "Slim", value: "Slim" },
          { text: "Original", value: "Original" },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="Sizes"
        onClickCheckbox={toggleSizes}
        selected={sizes}
        items={[
          { text: "20 cm", value: "20 cm" },
          { text: "30 cm", value: "30 cm" },
          { text: "40 cm", value: "40 cm" },
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
            max={prices.priceTo}
            value={prices.priceFrom.toString()}
            onChange={(e) => {
              updatePrice("priceFrom", Number(e.target.value));
            }}
          />
          <Input
            type="number"
            className="appearance-none"
            placeholder="100"
            min={prices.priceFrom}
            max={100}
            value={prices.priceTo.toString()}
            onChange={(e) => {
              updatePrice("priceTo", Number(e.target.value));
            }}
          />
        </div>
        <RangeSlider min={0} max={100} step={1} value={[prices.priceFrom, prices.priceTo]} onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })} />
      </div>

      {/* Ingredients filter*/}
      <CheckboxFiltersGroup title="Ingredients" name={"ingredients"} className="mt-5" limit={6} defaultItems={items.slice(0, 6)} items={items} loading={loading} onClickCheckbox={onAddId} selected={selectedIngredients} />
    </div>
  );
};

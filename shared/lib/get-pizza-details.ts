import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const getPizzaDetails = (items: ProductItem[], ingredients: Ingredient[], size: PizzaSize, type: PizzaType, selectedIngredients: Set<Number>) => {
    const totalPrice = calcTotalPizzaPrice(items, ingredients, size, type, selectedIngredients);
    
      const selectedIngredientNames = ingredients
        .filter((ingredient) => selectedIngredients.has(ingredient.id))
        .map((ingredient) => ingredient.name)
        .join(", ");
    
      const textDetails = `${size} cm, ${type === 1 ? "origin" : "thin"} dough${selectedIngredientNames ? ` with ${selectedIngredientNames}` : ""}`;

      return { totalPrice, textDetails };
}
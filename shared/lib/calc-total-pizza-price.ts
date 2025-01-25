import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const calcTotalPizzaPrice = (items: ProductItem[], ingredients: Ingredient[], size: PizzaSize, type: PizzaType, selectedIngredients: Set<Number>) => {
    const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)!.price;
    const totalIngredientsPrice = ingredients.filter((ingredient) => selectedIngredients.has(ingredient.id)).reduce((acc, ingredient) => acc + ingredient.price, 0);
    const totalPrice = pizzaPrice + totalIngredientsPrice;

    return totalPrice;
}
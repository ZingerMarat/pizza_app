import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)
    const total = (ingredientsPrice + item.productItem.price) * item.quantity;

    return total;
}
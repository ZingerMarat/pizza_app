import { error } from "console";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib";
import { create } from "zustand";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    // get items from the cart
    fetchCartItems: () => Promise<void>;

    // request for amount of items update
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;

    // request for item addition to the cart
    // TODO: Add type for values
    addCartItem: (values: any) => Promise<void>;

    // request for item removal from the cart
    removeCartItem: (id: number) => Promise<void>;

}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async () => {
        try {
          set({ loading: true, error: false });
          const data = await Api.cart.getCart();
          set(getCartDetails(data));
        } catch (error) {
          console.error(error);
          set({ error: true });
        } finally {
          set({ loading: false });
        }
      },

    removeCartItem: async (id: number) => {
        try {
          set({ loading: true, error: false });
          const data = await Api.cart.removeCartItem(id);
          set(getCartDetails(data));
        } catch (error) {
          console.error(error);
          set({ error: true });
        } finally {
          set({ loading: false });
        }
    },

    updateItemQuantity: async (id: number, quantity: number) => {
      try {
        set({ loading: true, error: false });
        const data = await Api.cart.updateItemQuantity(id, quantity);
        set(getCartDetails(data));
      } catch (error) {
        console.error(error);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },

    addCartItem: async (values: CreateCartItemValues) => {
      try {
        set({ loading: true, error: false });
        const data = await Api.cart.addCartItem(values);
        set(getCartDetails(data));
      } catch (error) {
        console.error(error);
        set({ error: true });
      } finally {
        set({ loading : false });
      }
    }
}));
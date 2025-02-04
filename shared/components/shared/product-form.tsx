"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ product, className }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      if (isPizzaForm) {
        await addCartItem({ productItemId, ingredients });
      } else {
        await addCartItem({ productItemId: firstItem.id });
      }

      toast.success(product.name + " added to cart");
    } catch (err) {
      toast.error("Failed to add product to cart");
      console.error(err);
    }
  };

  if (isPizzaForm) {
    return <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={onSubmit} loading={loading} />;
  } else {
    return <ChooseProductForm imageUrl={product.imageUrl} name={product.name} price={firstItem.price} onSubmit={onSubmit} loading={loading} />;
  }
};

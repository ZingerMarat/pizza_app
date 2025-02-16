"use client";

import { CheckoutItem, CheckoutSidebar, Container, Title, WhiteBlock } from "@/shared/components/shared";
import { FormInput } from "@/shared/components/shared/form";
import { Input, Textarea } from "@/shared/components/ui";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemDetails } from "@/shared/lib";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from "@/shared/components/shared/checkout";

const VAT = 18;
const DELIVERY_PRICE = 15;

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const vatPrice = (totalAmount * VAT) / 100;
  const subtotalPrice = totalAmount - vatPrice;

  return (
    <Container className="mt-10">
      <Title text="Checkout" size="lg" className="font-extrabold mb-8" />

      <div className="flex gap-10">
        {/* Left side */}
        <div className="flex flex-col gap-10 flex-1 mb-20">

          <CheckoutCart items={items} onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} />

          <CheckoutPersonalForm />

          <CheckoutAddressForm/>
        </div>

        {/* Right side */}
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}

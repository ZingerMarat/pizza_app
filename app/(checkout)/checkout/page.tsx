"use client";

import { CheckoutSidebar, Container, Title, WhiteBlock } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";

import { useForm, SubmitHandler, Form, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from "@/shared/components/shared/checkout";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { cn } from "@/shared/lib/utils";

const VAT = 18;
const DELIVERY_PRICE = 15;

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data);
  };

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const vatPrice = (totalAmount * VAT) / 100;
  const subtotalPrice = totalAmount - vatPrice;

  return (
    <Container className="mt-10">
      <Title text="Checkout" size="lg" className="font-extrabold mb-8" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Left side */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart items={items} onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} loading={loading}/>

              <CheckoutPersonalForm className={cn({'opacity-40 pointer-events-none' : loading})}/>

              <CheckoutAddressForm className={cn({'opacity-40 pointer-events-none' : loading})}/>
            </div>

            {/* Right side */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading}/>
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}

import { CheckoutItem, CheckoutItemDetails, Container, Title, WhiteBlock } from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title text="Checkout" size="lg" className="font-extrabold mb-8" />

      <div className="flex gap-10">
        {/* Left side */}
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="Cart">
            <div className="flex flex-col gap-5">
              <CheckoutItem id={0} imageUrl={""} details={""} name={""} price={0} quantity={0} />
              <CheckoutItem id={0} imageUrl={""} details={""} name={""} price={0} quantity={0} />
            </div>
          </WhiteBlock>

          <WhiteBlock title="Personal information">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="First name" />
              <Input name="lastName" className="text-base" placeholder="Last name" />
              <Input name="email" className="text-base" placeholder="Email" />
              <Input name="phone" className="text-base" placeholder="Phone" />
            </div>
          </WhiteBlock>

          <WhiteBlock title="Delivery information">
            <div className="flex flex-col gap-5">
              <Input name="Address" className="text-base" placeholder="Address" />
              <Textarea name="address" className="text-base" placeholder="Comment" rows={5} />
            </div>
          </WhiteBlock>
        </div>

        {/* Right side */}
        <div className="w-[450px]">
          <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Total:</span>
              <span className="text-[34px] font-extrabold">10$</span>
            </div>

            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-300" />
                  Subtotal
                </div>
              }
              value="10"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-300" />
                  Tax
                </div>
              }
              value="2"
            />
            <CheckoutItemDetails
              title={
                <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-300" />
                  Delivery
                </div>
              }
              value="5"
            />

            <Button type="submit" className="w-full g-14 rounded-2xl mt-6 text-base font-bold">
              Checkout
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </WhiteBlock>
        </div>
      </div>
    </Container>
  );
}

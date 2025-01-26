"use client";

import React, { PropsWithChildren } from "react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet";
import { Arrow } from "@radix-ui/react-popover";
import { Button } from "../ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

interface Props {
  className?: string;
}

// export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
//   const [totalAmount, items, fetchCartItems] = useCartStore((state) => [state.totalAmount, state.items, state.fetchCartItems]);

//   React.useEffect(() => {
//     fetchCartItems();
//   }, []);

//   return (
//     <Sheet>
//       <SheetTrigger asChild>{children}</SheetTrigger>
//       <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
//         <SheetHeader>
//           <SheetTitle>
//             in the card <span className="font-bold">3 items</span>
//           </SheetTitle>
//         </SheetHeader>

//         {/* Cart items */}
//         <div className="-mx-6 mt-5 overflow-auto flex-1">
//           <div className="mb-2">
//             {items.map((item) => (
//               <CartDrawerItem
//                 key={item.id}
//                 id={item.id}
//                 imageUrl={item.imageUrl}
//                 name={item.name}
//                 price={item.price}
//                 quantity={item.quantity}
//                 details={item.pizzaSize && item.pizzaType ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) : ""}
//               />
//             ))}
//           </div>
//         </div>

//         <SheetFooter className="-mx-6 bg-white p-8">
//           <div className="w-full">
//             <div className="flex mb-4">
//               <span className="flex flex-1 text-lg text-neutral-500">
//                 Total
//                 <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
//               </span>

//               <span className="font-bold text-lg">{totalAmount} $</span>
//             </div>

//             <Link href="/card">
//               <Button type="submit" className="w-full h-12 text-base">
//                 {" "}
//                 Order
//                 <ArrowRight className="w-5 ml-2" />
//               </Button>
//             </Link>
//           </div>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// };

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
  // Разделите состояния и действия, чтобы избежать изменений функции fetchCartItems
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  // Используйте useEffect для вызова fetchCartItems только при монтировании компонента
  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            In the cart{" "}
            <span className="font-bold">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        <div className="-mx-6 mt-5 overflow-auto flex-1">
          <div className="mb-2">
            {items.map((item) => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                details={item.pizzaSize && item.pizzaType ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) : ""}
              />
            ))}
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} $</span>
            </div>

            <Link href="/card">
              <Button type="submit" className="w-full h-12 text-base">
                {" "}
                Order
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

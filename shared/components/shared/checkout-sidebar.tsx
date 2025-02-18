import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";

const VAT = 18;
const DELIVERY_PRICE = 15;

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({totalAmount, loading }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const subtotalPrice = totalAmount - vatPrice;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total:</span>
        {loading ? <Skeleton className="w-48 h-11" /> : <span className="h-11 text-[34px] font-extrabold">{totalAmount} $</span>}
        
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            Subtotal
          </div>
        }
        value={loading? <Skeleton className="w-12 h-6 rounded-[6px]" /> : `${subtotalPrice} $`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-300" />
            Tax
          </div>
        }
        value={loading? <Skeleton className="w-12 h-6 rounded-[6px]" /> : `${vatPrice} $`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" />
            Delivery
          </div>
        }
        value={loading? <Skeleton className="w-12 h-6 rounded-[6px]" /> : `${DELIVERY_PRICE} $`}
      />

      <Button loading={loading} type="submit" className="w-full g-14 rounded-2xl mt-6 text-base font-bold">
        Checkout
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};

export default CheckoutSidebar;

import React from 'react';
import { WhiteBlock } from '../white-block';
import { Input, Textarea } from '../../ui';
import { FormTextarea } from '../form';

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="Delivery information">
        <div className="flex flex-col gap-5">
          <Input name="Address" className="text-base" placeholder="Address" />
          <FormTextarea name="comment" className="text-base" placeholder="Comment" rows={5} />
        </div>
      </WhiteBlock>
    );
};
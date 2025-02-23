import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface EmailTemplateProps {
    orderId: number,
    items: CartItemDTO[]
}

export const OrderSuccessTemplate: React.FC<Readonly<EmailTemplateProps>> = ({orderId, items}) => {
    return (
        <div>
            <h1>Thank you for your order #{orderId}</h1>

            <p>Your order has been successfully payed.</p>
            <p>Items:</p>

            <hr/>

            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <p>{item.productItem.product.name} | {item.productItem.price} $ x {item.quantity} = {' '} {item.productItem.price * item.quantity} $</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
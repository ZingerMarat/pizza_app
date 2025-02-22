import React from 'react';

interface EmailTemplateProps {
    orderId: number,
    totalAmount: number,
    paymentURL: string
}

export const PayOrderTemplate: React.FC<Readonly<EmailTemplateProps>> = ({orderId, totalAmount, paymentURL}) => {
    return (
        <div>
            <h1>Order #{orderId}</h1>
            <p>Please pay for your order with total amount {totalAmount} $.</p>
            <p>Follow <a href={paymentURL}>this link</a> to pay for your order</p>
        </div>
    );
}
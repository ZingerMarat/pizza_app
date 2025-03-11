'use server';


import {PayOrderTemplate} from '@/shared/components/shared/';
import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';
import { hashSync } from 'bcrypt';

export async function createOrder(data: CheckoutFormValues){
    try{
        const cookieStore = await cookies();
        const cartToken = cookieStore.get('cartToken')?.value;

        if (!cartToken){
            throw new Error('Cart token not found')
        }

        // Find cart by token
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken
            }
        });

        // Check if cart does not exist
        if(!userCart){
            throw new Error('Cart not found')
        }

        // Check if cart is empty
        if (userCart?.totalAmount === 0){
            throw new Error('Cart is empty')
        }

        // Create order
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                totalAmount: userCart.totalAmount,
                address: data.address,
                comment: data.comment,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            }
        });

        // Clear cart
        await prisma.cart.update({
            where: {
                id: userCart.id
            },
            data: {
                totalAmount: 0,
            }
        });

        // Clear cart items
        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        });

        // Create payment
        const paymentData = await createPayment({amount: order.totalAmount, description: 'Order #' + order.id, orderID: order.id});

        if (!paymentData){
            throw new Error('Payment data not found');
        }
        
        // Update order with payment id
        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paymentId: paymentData.id,

            }
        });

        const paymentURL = paymentData.confirmation.confirmation_url;

        // Send email
        const payOrderTemplate = await PayOrderTemplate({orderId: order.id, totalAmount: order.totalAmount, paymentURL});
        await sendEmail(data.email, 'Next Pizza | Pay for you order #' + order.id, payOrderTemplate);

        return paymentURL;
    } catch (err) {
        console.log('[CreateOrder] Server error', err);
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput){
    try {
        const currentUser = await getUserSession();
        
        if(!currentUser){
            throw new Error('User not found');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id)
            },
            data: {
                email: body.email,
                fullName: body.fullName,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            }
        });

    } catch (err) {
        console.log('[UpdateUserInfo] Server error', err);
        throw err;
    }
}
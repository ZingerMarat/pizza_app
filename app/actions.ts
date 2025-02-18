'use server';

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

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

    } catch {
        throw new Error('Error while creating order');
    }
}
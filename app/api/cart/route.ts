import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib";

export async function GET(req: NextRequest) {
    try {
        const userId = 1;
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: []});
        }

        const userCart = await prisma.cart.findFirst({
            where: {token},
            include: {items: {orderBy: {createdAt: 'desc'}, include: {productItem: {include: {product: true}}, ingredients: true}}}
    });

        return NextResponse.json(userCart);
    } catch (error) {
        console.log('[CART_GET] Server error', error);
        return NextResponse.json({message: 'Cart fetch failed'}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        // check if user have a token
        let token = req.cookies.get('cartToken')?.value;

        if(!token) {
            token = crypto.randomUUID();
        }

        // find or create cart
        const userCart = await findOrCreateCart(token);

        // check if product already exists in cart
        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                ingredients: {every: {id: {in: data.ingredients}}}
            }
        });

        if (findCartItem) {
            await prisma.cartItem.update({
                where: {id: findCartItem.id},
                data: {quantity: findCartItem.quantity + 1}
            });
           
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: {connect: data.ingredients?.map(id => ({id}))}
                }
            });

        }

        const updatedUserCart = await updateCartTotalAmount(token);
        const resp = NextResponse.json(updatedUserCart);

        resp.cookies.set('cartToken', token);
        
        return resp;     

    } catch (error) {
        console.log('[CART_POST] Server error', error);
        return NextResponse.json({message: 'Cart creation failed'}, {status: 500});
    }
}
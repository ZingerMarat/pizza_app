import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, props: {params: Promise<{id: string}>}) {
    const params = await props.params;
    try{
        const id = Number(params.id);
        const data = (await req.json()) as {quantity: number};
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({message : 'Cart token not found'});
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id,
            }
        });

        if (!cartItem) {
            return NextResponse.json({message : 'Cart item not found'});
        }

        await prisma.cartItem.update({
            where: {
                id,
            },
            data: {
                quantity: data.quantity,
            }
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
    }
    catch (error) {
        console.error('[CART_PATCH] Server error', error);
        return NextResponse.json({message : 'Cart upadte failed'}, {status: 500});
    }
}

export async function DELETE(req: NextRequest, props: {params: Promise<{id: string}>}) {
    const params = await props.params;
    try{
        const id = Number(params.id);
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({message : 'Cart token not found'});
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id,
            }
        });

        if (!cartItem) {
            return NextResponse.json({message : 'Cart item not found'});
        }

        await prisma.cartItem.delete({
            where: {
                id,
            }
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
    }
    catch (error) {
        console.error('[CART_DELETE] Server error', error);
        return NextResponse.json({message : 'Cart item deletion failed'}, {status: 500});
    }
}
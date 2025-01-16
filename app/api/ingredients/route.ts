import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
    const ingredients = await prisma.ingredient.findMany();
    //const ingredients = await prisma.$queryRaw`SELECT * FROM public."Ingredient"`;

    return NextResponse.json(ingredients);
}
import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    pizzaTypes?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;


export const findPizzas = async (params: GetSearchParams) => {

    const sizes = params.sizes?.split(",").map(Number);
    const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
    const ingredientsArr = params.ingredients?.split(",").map(Number);

    let minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    let maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    if (minPrice < DEFAULT_MIN_PRICE) {
        minPrice = DEFAULT_MIN_PRICE;
    }
    
    if (maxPrice > DEFAULT_MAX_PRICE) {
        maxPrice = DEFAULT_MAX_PRICE;
    }


    const categories = await prisma.category.findMany({
    include: {
        products: { orderBy: {id: 'desc'},
                    where: {ingredients : ingredientsArr ? { some: { id: { in: ingredientsArr } } } : undefined,
                            items: { some: {    size: { in: sizes },
                                                pizzaType: { in: pizzaTypes }, 
                                                price: { gte: minPrice, lte: maxPrice},
                                            },
                            

                                    }
                            },
                    include: {  ingredients: true,
                                items: {
                                    orderBy: { price: 'asc' },
                                    where: { price: { gte: minPrice, lte: maxPrice } },
                                }, },
                },
    },
    });

    return categories;
}
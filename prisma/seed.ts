import { hashSync } from 'bcrypt';
import { prisma } from "./prisma-client";
import { Prisma } from '@prisma/client';

async function up(){

    const randomDecimalNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
      };
      
      const generateProductItem = ({
        productId,
        pizzaType,
        size,
      }: {
        productId: number;
        pizzaType?: 1 | 2;
        size?: 20 | 30 | 40;
      }) => {
        return {
          productId,
          price: randomDecimalNumber(30, 60),
          pizzaType,
          size,
        } as Prisma.ProductItemUncheckedCreateInput;
      };
      
    // Create a new user
    await prisma.user.createMany({
        data: [
            {
                fullName: 'User Test',
                email: 'user@test.com',
                password: hashSync('password', 10),
                verified: new Date(),
                role: 'USER'},
            {
                fullName: 'Admin Admin',
                email: 'admin@test.com',
                password: hashSync('password', 10),
                verified: new Date(),
                role: 'ADMIN'},
        ]
    });

    await prisma.category.createMany({
        data: [
            { name: "Pizza" },
            { name: "Combo" },
            { name: "Snacks" },
            { name: "Cocktails" },
            { name: "Coffee" },
            { name: "Drinks" },
            { name: "Desserts" },
        ]
    });

    const _ingredients = [
        {
          name: 'Cheese Crust',
          price: 18,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
        },
        {
          name: 'Creamy Mozzarella',
          price: 8,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
        },
        {
          name: 'Cheddar and Parmesan Cheeses',
          price: 8,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
        },
        {
          name: 'Spicy Jalapeño Pepper',
          price: 6,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
        },
        {
          name: 'Tender Chicken',
          price: 8,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
        },
        {
          name: 'Mushrooms',
          price: 6,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
        },
        {
          name: 'Bacon',
          price: 8,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
        },
        {
          name: 'Ham',
          price: 8,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
        },
        {
          name: 'Spicy Pepperoni',
          price: 8,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
        },
        {
          name: 'Spicy Chorizo',
          price: 8,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
        },
        {
          name: 'Pickled Cucumbers',
          price: 6,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
        },
        {
          name: 'Fresh Tomatoes',
          price: 6,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
        },
        {
          name: 'Red Onion',
          price: 6,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
        },
        {
          name: 'Juicy Pineapples',
          price: 6,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
        },
        {
          name: 'Italian Herbs',
          price: 4,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
        },
        {
          name: 'Sweet Pepper',
          price: 6,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
        },
        {
          name: 'Bryndza Cubes',
          price: 8,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
        },
        {
          name: 'Meatballs',
          price: 8,
          imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
        },
      ].map((obj, index) => ({ ...obj, id: index + 1 }))

    await prisma.ingredient.createMany({
        data: _ingredients,
      });

        await prisma.product.createMany({
            data: [
                {
                  name: 'Omelette with Ham and Mushrooms',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp',
                  categoryId: 2,
                },
                {
                  name: 'Omelette with Pepperoni',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
                  categoryId: 2,
                },
                {
                  name: 'Coffee Latte',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
                  categoryId: 2,
                },
                {
                  name: 'Denwich with Ham and Cheese',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp',
                  categoryId: 3,
                },
                {
                  name: 'Chicken Nuggets',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp',
                  categoryId: 3,
                },
                {
                  name: 'Baked Potatoes with Sauce 🌱',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp',
                  categoryId: 3,
                },
                {
                  name: 'Dodster',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp',
                  categoryId: 3,
                },
                {
                  name: 'Spicy Dodster 🌶️🌶️',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp',
                  categoryId: 3,
                },
                {
                  name: 'Banana Milkshake',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp',
                  categoryId: 4,
                },
                {
                  name: 'Caramel Apple Milkshake',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp',
                  categoryId: 4,
                },
                {
                  name: 'Milkshake with Oreo Cookies',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
                  categoryId: 4,
                },
                {
                  name: 'Classic Milkshake 👶',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
                  categoryId: 4,
                },
                {
                  name: 'Irish Cappuccino',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
                  categoryId: 5,
                },
                {
                  name: 'Caramel Cappuccino',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
                  categoryId: 5,
                },
                {
                  name: 'Coconut Latte',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
                  categoryId: 5,
                },
                {
                  name: 'Americano Coffee',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
                  categoryId: 5,
                },
                {
                  name: 'Coffee Latte',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
                  categoryId: 5,
                },
              ]
        });
    
        const pizza1 = await prisma.product.create({
            data: {
              name: 'Pepperoni Fresh',
              imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
              categoryId: 1,
              ingredients: {
                connect: _ingredients.slice(0, 5),
              },
            },
          });
          
          const pizza2 = await prisma.product.create({
            data: {
              name: 'Cheese Pizza',
              imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
              categoryId: 1,
              ingredients: {
                connect: _ingredients.slice(5, 10),
              },
            },
          });
          
          const pizza3 = await prisma.product.create({
            data: {
              name: 'Chorizo Fresh',
              imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
              categoryId: 1,
              ingredients: {
                connect: _ingredients.slice(10, 40),
              },
            },
          });

          await prisma.productItem.createMany({
            data: [
              // pizza "Pepperoni Fresh"
              generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
              generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
              generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),
        
              // pizza "Cheese"
              generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
              generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
              generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
              generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
              generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
              generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),
        
              // pizza "Chorizo Fresh"
              generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
              generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
              generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),
        
              // other
              generateProductItem({ productId: 1 }),
              generateProductItem({ productId: 2 }),
              generateProductItem({ productId: 3 }),
              generateProductItem({ productId: 4 }),
              generateProductItem({ productId: 5 }),
              generateProductItem({ productId: 6 }),
              generateProductItem({ productId: 7 }),
              generateProductItem({ productId: 8 }),
              generateProductItem({ productId: 9 }),
              generateProductItem({ productId: 10 }),
              generateProductItem({ productId: 11 }),
              generateProductItem({ productId: 12 }),
              generateProductItem({ productId: 13 }),
              generateProductItem({ productId: 14 }),
              generateProductItem({ productId: 15 }),
              generateProductItem({ productId: 16 }),
              generateProductItem({ productId: 17 }),
            ],
          });
        
    await prisma.cart.createMany({
        data: [
            {
                userId:1,
                totalAmount: 0,
                token: '11111'
            },
            {
                userId:2,
                totalAmount: 0,
                token: '22222'
            }
        ]
    });

    await prisma.cartItem.create({
        data: 
            {
                cartId: 1,
                productItemId: 1,
                quantity: 2,
                ingredients: {
                    connect: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 4 },
                    ],
                },
            },
    });
          

    
}

async function down(){
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main(){
    try{
        await down();
        await up();
    } catch(e){
        console.error(e);
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
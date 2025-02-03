import { Container, Title, TopBar, Filters, ProductsGroupList } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";
import { findPizzas } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/find-pizzas";

export default async function Home(props: { searchParams: Promise<GetSearchParams> }) {
  const searchParams = await props.searchParams;
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-5">
        <Title text="All pizzas" size="lg" className="font=extrabold"></Title>
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/*Filter*/}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/*Products*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">{categories.map((category) => category.products.length > 0 && <ProductsGroupList key={category.id} title={category.name} categoryId={category.id} items={category.products} />)}</div>
          </div>
        </div>
      </Container>
    </>
  );
}

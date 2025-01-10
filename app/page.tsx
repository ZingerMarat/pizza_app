import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container, Title, Categories, SortPopup, TopBar, Filters, ProductCard, ProductsGroupList } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="All pizzas" size="lg" className="font=extrabold"></Title>
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/*Filter*/}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/*Products*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title={"Pizzas"}
                categoryId="1"
                items={[
                  {
                    id: 1,
                    name: "Pizza 1",
                    imageUrl: "https://media.dodostatic.net/image/r:584x584/11ee7d61706d472f9a5d71eb94149304.avif",
                    items: [{ price: 10 }],
                  },
                  {
                    id: 2,
                    name: "Pizza 2",
                    imageUrl: "https://media.dodostatic.net/image/r:584x584/11ee7d614cbe0530b7234b6d7a6e5f8e.avif",
                    items: [{ price: 20 }],
                  },
                  {
                    id: 3,
                    name: "Pizza 3",
                    imageUrl: "https://media.dodostatic.net/image/r:584x584/11ee7d6175c10773bfe36e56d48df7e3.avif",
                    items: [{ price: 30 }],
                  },
                  {
                    id: 4,
                    name: "Pizza 4",
                    imageUrl: "https://media.dodostatic.net/image/r:584x584/11ee7d61706d472f9a5d71eb94149304.avif",
                    items: [{ price: 40 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

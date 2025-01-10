import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Container,
  Title,
  Categories,
  SortPopup,
  TopBar,
  Filters,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="All pizzas" size="lg" className="font=extrabold"></Title>
      </Container>
      <TopBar />
      <Container className="pb-14">
        <div className="flex gap-[60px]">
          {/*Filter*/}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/*Products*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">Pizzas list</div>
          </div>
        </div>
      </Container>
    </>
  );
}

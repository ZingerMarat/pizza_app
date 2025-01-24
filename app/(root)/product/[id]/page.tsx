import { Container, PizzaImage, Title } from "@/shared/components/shared";
import { GroupVariants } from "@/shared/components/shared/group-variants";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-20">
      <div className="flex flex-1">
        <PizzaImage imageUrl={product.imageUrl} className="my-20" size={20} />

        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title className="font-extrabold mb-1" text={product.name} size="md"></Title>
          <p className="text-gray-400">bla bla bla</p>

          <GroupVariants
            items={[
              { name: "small", value: "1" },
              { name: "medium", value: "2" },
              { name: "large", value: "3" },
            ]}
            value="2"
          ></GroupVariants>
        </div>
      </div>
    </Container>
  );
}

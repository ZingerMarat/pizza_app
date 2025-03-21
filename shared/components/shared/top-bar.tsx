import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import React from "react";
import { Categories } from "./categories";
import { Category } from "@prisma/client";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <Container className="flex justify-between items-center">
        <Categories items={categories} />
      </Container>
    </div>
  );
};

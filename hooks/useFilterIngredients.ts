import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client"
import React from "react";
import { useSet } from "react-use";

type IngredientItem = {
    id: number,
    name: string,
};

interface ReturnProps {
    ingredients: IngredientItem[],
    loading: boolean,
    selectedIds: Set<string>,
    onAddId: (id: string) => void,
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [selectedIds, {toggle}] = useSet(new Set<string>());

    React.useEffect(() => {
        async function fetchIngredients() {
            try {
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients.map((ingredient) => ({id: ingredient.id, name: ingredient.name})));
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients();
    }, []);

    return {ingredients, loading, onAddId: toggle, selectedIds};
}
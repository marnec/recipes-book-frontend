import { Recipe } from "@cooklang/cooklang-ts";
import { Ingredient } from "./ingredient.interface";

export interface RecipeIngredient {
    ingredientId: string,
    ingredient: Ingredient,
    order: number;
    quantity?: number;
    unit?: string;
}
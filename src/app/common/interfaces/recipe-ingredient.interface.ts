import { Recipe } from "@cooklang/cooklang-ts";
import { Ingredient } from "./ingredient.interface";

export interface RecipeIngredient {
    ingredient: Ingredient,
    order: number;
}
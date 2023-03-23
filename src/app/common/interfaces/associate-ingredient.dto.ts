import { IngredientSearchResult } from './nutritionix/search-ingredient-result.interface';

export interface AssociateIngredientDto {
  recipeId: string;
  ingredient: Partial<IngredientSearchResult>;
}


export interface AssociateNewIngredientDto {
    recipeId: string;
    ingredientName: string;
}
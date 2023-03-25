import { Recipe } from "@cooklang/cooklang-ts";

export interface Ingredient  {
    
    id: string;
  
    
    name: string;
  
    
    set: number;
  
    
    unit: string;
  
    
    amount?: number;
  
    
    externalId: number;
  
    // ingredientNutrients?: IngredientNutrient[]
  }
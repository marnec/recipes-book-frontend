
export interface Ingredient {
  id: string;

  name: string;

  set: number;

  unit?: string;

  amount?: number;

  externalId?: number;

  nutrientsSourceId?: number;

  // only in placeholder ingredients
  isPlaceholder?: boolean

  // ingredientNutrients?: IngredientNutrient[]
}

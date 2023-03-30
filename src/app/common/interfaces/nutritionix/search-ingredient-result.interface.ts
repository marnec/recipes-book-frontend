export interface IngredientFullNutrient {
  value: number;
  attrId: number;
}

export interface IngredientSearchResult {
  foodName: string;

  servingUnit: string;

  tagName: string;

  servingQty: number;

  commonType: null;

  tagId: number;

  photo: {
    thumb: string;
  };
  locale: string;

  fullNutrients: IngredientFullNutrient[]

  servingWeightGrams: number;
}

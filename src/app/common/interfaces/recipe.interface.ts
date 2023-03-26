import { BaseI } from './base.interface';
import { RecipeIngredient } from './recipe-ingredient.interface';

export interface Recipe extends BaseI {
  title: string;
  body: string;
  servings: number;
  ingredients: RecipeIngredient[];
}

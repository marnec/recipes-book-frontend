import { BaseI } from './base.interface';
import { Ingredient } from './ingredient.interface';

export interface Recipe extends BaseI {
  title: string;
  body: string;
  servings: number;
  ingredients: Ingredient[];
}

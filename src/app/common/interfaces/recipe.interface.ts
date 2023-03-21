import { BaseI } from "./base.interface";

export interface Recipe extends BaseI {
    title: string;
    body: string;
    servings: number;
}
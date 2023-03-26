import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesPageRoutingModule } from './recipes-routing.module';

import { AppCommonModule } from '../common/common.module';
import { RecipesPage } from './recipes-list/recipes-list.page';
import { RecipeEditPage } from './recipe-edit/recipe-edit.page';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { RecipeIngredientItemComponent } from './recipe-ingredient-item/recipe-ingredient-item.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    FormsModule,
    IonicModule,
    RecipesPageRoutingModule,
    IngredientsModule
  ],
  declarations: [RecipesPage, RecipeEditPage, RecipeIngredientItemComponent]
})
export class RecipesPageModule {}

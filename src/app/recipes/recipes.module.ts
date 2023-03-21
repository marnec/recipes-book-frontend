import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesPageRoutingModule } from './recipes-routing.module';

import { AppCommonModule } from '../common/common.module';
import { RecipesPage } from './recipes-list/recipes-list.page';
import { RecipeEditPage } from './recipe-edit/recipe-edit.page';
import { IngredientsModule } from '../ingredients/ingredients.module';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    FormsModule,
    IonicModule,
    RecipesPageRoutingModule,
    IngredientsModule
  ],
  declarations: [RecipesPage, RecipeEditPage]
})
export class RecipesPageModule {}

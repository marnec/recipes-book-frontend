import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { URLPARAM_ID_KEY } from '../common/constants';
import { RecipeEditPage } from './recipe-edit/recipe-edit.page';

import { RecipesPage } from './recipes-list/recipes-list.page';

const routes: Routes = [
  {
    path: '',
    component: RecipesPage,
  },
  {
    path: `:${URLPARAM_ID_KEY}`,
    component: RecipeEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}

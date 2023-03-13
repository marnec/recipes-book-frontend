import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesPageRoutingModule } from './recipes-routing.module';

import { RecipesPage } from './recipes.page';
import { TranslateModule } from '@ngx-translate/core';
import { AppCommonModule } from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    FormsModule,
    IonicModule,
    RecipesPageRoutingModule,
  ],
  declarations: [RecipesPage]
})
export class RecipesPageModule {}

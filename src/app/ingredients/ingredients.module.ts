import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsComponent } from './ingredients.component';
import { IonicModule } from '@ionic/angular';
import { AppCommonModule } from '../common/common.module';

@NgModule({
  declarations: [IngredientsComponent],
  imports: [CommonModule, IonicModule, AppCommonModule],
  exports: [IngredientsComponent],
})
export class IngredientsModule {}

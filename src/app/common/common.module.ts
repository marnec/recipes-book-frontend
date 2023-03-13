import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceModalComponent } from './components/choice-modal/choice-modal.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [ChoiceModalComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    TranslateModule
  ]
})
export class AppCommonModule { }

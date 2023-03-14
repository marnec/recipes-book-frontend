import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoiceModalComponent } from './components/choice-modal/choice-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [ChoiceModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ScrollingModule
  ],
  exports: [
    TranslateModule,
    ScrollingModule
  ]
})
export class AppCommonModule { }

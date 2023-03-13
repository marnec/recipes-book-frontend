import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface Choice {
  value: boolean | number | string;
  role: string;
}

@Component({
  selector: 'app-choice-modal',
  templateUrl: './choice-modal.component.html',
  styleUrls: ['./choice-modal.component.scss'],
})
export class ChoiceModalComponent {
  message!: string;

  choices: Choice[] = [
    { value: true, role: 'confirm' },
    { value: false, role: 'cancel' },
  ];

  constructor(private modal: ModalController) {}
  
  close(i: number) {
    const { value, role } = this.choices[i];
    this.modal.dismiss(value, role);
  }
}

import { Component, OnInit } from '@angular/core';
import { PlansService } from './plans.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {
  constructor(private plansService: PlansService) {}

  ngOnInit() {}

  addPlan() {
    this.plansService.addPlan().pipe(first()).subscribe();
  }
}

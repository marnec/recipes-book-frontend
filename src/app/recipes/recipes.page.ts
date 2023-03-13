import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Recipe } from '../common/interfaces/recipe.interface';
import { ListComponent } from '../common/list.abstract.component';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage extends ListComponent<Recipe> implements OnInit {
  
  constructor(
    protected override entityService: RecipesService,
    protected override modal: ModalController
  ) {
    super(entityService, modal);
  }

  addFilters(filters: Partial<Recipe>): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.lazyLoad();
  }
}

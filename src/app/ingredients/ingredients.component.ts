import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, of, Subject, switchMap, takeUntil } from 'rxjs';
import { AsyncComponent } from '../common/components/async.abstract.component';
import { IngredientSearchResult } from '../common/interfaces/nutritionix/search-ingredient-result.interface';
import { IngredientsService } from '../recipes/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent extends AsyncComponent {
  ingredientSearch = new FormControl<string>('');

  ingredients: IngredientSearchResult[] | undefined;

  constructor(private ingredientsService: IngredientsService) {
    super()
  }


  ionViewDidEnter() {
    this.searchIngredientOnInputChange();
  }

  private searchIngredientOnInputChange() {
    this.ingredientSearch.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(200),
        switchMap((searchInput) => {
          if (!searchInput) {
            return of(null);
          }
          return this.ingredientsService.searchIngredient(searchInput);
        }),
        filter(Boolean)
      )
      .subscribe((ingredients) => {
        this.ingredients = ingredients;
      });
  }

  addIngredient(ingredient?: IngredientSearchResult) {

    if (!ingredient) {
      // create
    }

    // save

  }
}

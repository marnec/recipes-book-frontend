import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { debounceTime, filter, of, Subject, switchMap, takeUntil } from 'rxjs';
import { AsyncComponent } from '../common/components/async.abstract.component';
import { IngredientModalDismissRoles } from '../common/constants';
import { IngredientSearchResult } from '../common/interfaces/nutritionix/search-ingredient-result.interface';
import { IngredientsService } from '../recipes/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent
  extends AsyncComponent
  implements AfterViewInit
{
  @Input() prompt = '';

  ingredientSearch = new FormControl<string>('');

  ingredients: IngredientSearchResult[] | undefined;

  constructor(
    private ingredientsService: IngredientsService,
    private modal: ModalController
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.unsubscribe$ = new Subject();
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

    this.ingredientSearch.setValue(this.prompt);
  }

  addIngredient(ingredient?: Partial<IngredientSearchResult>) {
    if (!this.ingredientSearch.value) {
      throw new Error('ingredient name should be defined');
    }

    let role: IngredientModalDismissRoles;
    if (!ingredient) {
      ingredient = {
        foodName: this.ingredientSearch.value,
      };
      role = IngredientModalDismissRoles.create;
    } else if (this.prompt) {
      role = IngredientModalDismissRoles.link;
    } else {
      role = IngredientModalDismissRoles.select;
    }
    this.modal.dismiss(ingredient, role);
  }
}

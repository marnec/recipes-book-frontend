import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { debounceTime, filter, of, Subject, switchMap, takeUntil } from 'rxjs';
import { AsyncComponent } from '../common/components/async.abstract.component';
import { DEFAULT_DEBOUNCE, IngredientModalDismissRoles } from '../common/constants';
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
  @ViewChild('searchbar') searchbar!: IonSearchbar;
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

  ionViewDidEnter() {
    this.searchbar.setFocus();
  }

  private searchIngredientOnInputChange() {
    this.ingredientSearch.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(DEFAULT_DEBOUNCE),
        switchMap((searchInput) => {
          if (!searchInput) {
            return of(null);
          }
          return this.ingredientsService.searchIngredient(searchInput);
        }),
        filter(Boolean)
      )
      .subscribe((ingredients) => {
        this.ingredients = ingredients.filter(
          ({ servingWeightGrams }) =>
            servingWeightGrams !== undefined && servingWeightGrams !== null
        );
        console.info(
          `filtered out ${ingredients.length - this.ingredients.length}`
        );
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

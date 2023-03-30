import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs';
import { AsyncComponent } from 'src/app/common/components/async.abstract.component';
import { DEFAULT_DEBOUNCE } from 'src/app/common/constants';
import { RecipeIngredient } from 'src/app/common/interfaces/recipe-ingredient.interface';

export interface IngredientQuantity {
  id: string;
  quantity: number;
  unit: string;
}

@Component({
  selector: 'app-recipe-ingredient-item',
  templateUrl: './recipe-ingredient-item.component.html',
  styleUrls: ['./recipe-ingredient-item.component.scss'],
})
export class RecipeIngredientItemComponent
  extends AsyncComponent
  implements OnInit
{
  @Input() ingredient!: RecipeIngredient;

  @Output() ingredientRemove = new EventEmitter<string>();

  @Output() ingredientConnect = new EventEmitter<string>();

  @Output() quantityChange = new EventEmitter<IngredientQuantity>();

  ingredientForm!: FormGroup<{
    [K in keyof Omit<IngredientQuantity, 'id'>]: FormControl<
      IngredientQuantity[K] | null | undefined
    >;
  }>;

  constructor() {
    super();
  }

  ngOnInit() {
    this.instantiateUnsubscribe();

    this.ingredientForm = new FormGroup({
      quantity: new FormControl(this.ingredient.quantity),
      unit: new FormControl(this.ingredient.unit),
    });

    this.ingredientForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$), debounceTime(DEFAULT_DEBOUNCE))
      .subscribe((value) => {
        this.quantityChange.emit({
          ...value,
          id: this.ingredient.ingredient.id,
        } as IngredientQuantity);
      });
  }
}

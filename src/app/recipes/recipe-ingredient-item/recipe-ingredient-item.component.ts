import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ingredient } from 'src/app/common/interfaces/ingredient.interface';

@Component({
  selector: 'app-recipe-ingredient-item',
  templateUrl: './recipe-ingredient-item.component.html',
  styleUrls: ['./recipe-ingredient-item.component.scss'],
})
export class RecipeIngredientItemComponent implements OnInit {
  @Input() ingredient!: Ingredient;

  @Output() ingredientRemove = new EventEmitter<string>();

  @Output() ingredientConnect = new EventEmitter<string>();

  ingredientForm!: FormGroup

  constructor() {}

  ngOnInit() {
    this.ingredientForm = new FormGroup({
      name: new FormControl(this.ingredient.name),
      amount: new FormControl(this.ingredient.amount),
      unit: new FormControl(this.ingredient.unit),
    });
  }
}

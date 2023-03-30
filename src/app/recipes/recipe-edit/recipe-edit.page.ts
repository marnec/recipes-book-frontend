import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemReorderEventDetail, ModalController } from '@ionic/angular';
import { omit } from 'radash';
import {
  debounceTime,
  filter,
  firstValueFrom,
  of,
  switchMap,
  takeUntil
} from 'rxjs';
import { EditComponent } from 'src/app/common/components/edit.abstract.component';
import {
  DEFAULT_DEBOUNCE,
  ID_PLACEHOLDER,
  IngredientModalDismissRoles
} from 'src/app/common/constants';
import { IngredientSearchResult } from 'src/app/common/interfaces/nutritionix/search-ingredient-result.interface';
import { Recipe } from 'src/app/common/interfaces/recipe.interface';
import { IngredientsComponent } from 'src/app/ingredients/ingredients.component';
import { IngredientsService } from '../ingredients.service';
import { IngredientQuantity } from '../recipe-ingredient-item/recipe-ingredient-item.component';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.page.html',
  styleUrls: ['./recipe-edit.page.scss'],
})
export class RecipeEditPage extends EditComponent<
  Recipe,
  'id' | 'ingredients'
> {
  constructor(
    private modal: ModalController,
    private recipesService: RecipesService,
    private ingredientsService: IngredientsService,
    protected override route: ActivatedRoute
  ) {
    super(route, recipesService);
  }

  ionViewDidEnter() {
    this.form = new FormGroup({
      body: new FormControl<string | null>(null),
      title: new FormControl<string | null>(null),
      servings: new FormControl<number | null>(null, [Validators.min(0)]),
    });

    this.retrieveEntityById()
      .pipe(
        switchMap((recipe) => {
          if (!recipe || !this.form) {
            return of(null);
          }

          this.setValueOnRecipeFetched(recipe);

          return this.form.valueChanges.pipe(
            takeUntil(this.unsubscribe$),
            debounceTime(DEFAULT_DEBOUNCE)
          );
        }),
        filter(() => this.form.valid),
        filter(Boolean),
        switchMap((value) => {
          return this.recipesService.save(this.entity?.id, value);
        })
      )
      .subscribe({ next: (recipe) => (this.entity = recipe) });
  }

  public async findIngredient(prompt?: string) {
    if (!this.entity?.id) {
      return;
    }

    const modal = await this.modal.create({
      component: IngredientsComponent,
      componentProps: { prompt },
      initialBreakpoint: 0.75,
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss<IngredientSearchResult>();

    if (role === IngredientModalDismissRoles.cancel || !data) {
      return;
    }

    if (role === IngredientModalDismissRoles.link) {
      const unlinkedIngredient = this.entity.ingredients.find(
        (recipeIngredient) => recipeIngredient.ingredient.name === prompt
      )?.ingredient;

      if (!unlinkedIngredient) {
        return;
      }

      await firstValueFrom(
        this.ingredientsService.linkIngredient(unlinkedIngredient.id, data)
      );
    } else {
      this.entity.ingredients.push({
        ingredientId: ID_PLACEHOLDER,
        order:
          (Math.max(...this.entity.ingredients.map((i) => i.order)) || 0) + 1,
        ingredient: {
          id: ID_PLACEHOLDER,
          isPlaceholder: true,
          name: data.foodName,
          externalId: data.tagId,
          set: -1,
        },
      });
      await firstValueFrom(
        this.recipesService.associateIngredient(this.entity.id, data)
      );
    }

    await firstValueFrom(this.retrieveEntityById());
  }

  private setValueOnRecipeFetched(recipe: Recipe) {
    this.form?.patchValue(
      {
        body: recipe?.body,
        title: recipe?.title,
        servings: recipe?.servings,
      },
      { emitEvent: false }
    );
  }

  public removeIngredient(ingredientId: string) {
    if (!this.entity?.id) {
      return;
    }

    this.recipesService
      .removeIngredient(this.entity?.id, ingredientId)
      .pipe(
        switchMap(() => this.retrieveEntityById()),
        filter(Boolean)
      )
      .subscribe({
        next: (recipe) => this.setValueOnRecipeFetched(recipe),
      });
  }

  async handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    if (!this.entity) {
      return;
    }
    const ingredientId = this.entity.ingredients[ev.detail.from].ingredient.id;

    await firstValueFrom(
      this.recipesService.reorderIngredient(
        this.entity.id,
        ingredientId,
        ev.detail.from,
        ev.detail.to
      )
    );
    ev.detail.complete();
  }

  async setIngredientQuantity(ingredientQuantity: IngredientQuantity) {
    const ingredientId = ingredientQuantity.id;

    return firstValueFrom(
      this.recipesService.setIngredientQuantity(
        this.entity?.id as string,
        ingredientId,
        omit(ingredientQuantity, ['id'])
      )
    );
  }

  changeServings(increment: number) {
    this.form?.patchValue({
      servings: (this.form?.value?.servings || 0) + increment,
    });
  }

  ionViewWillLeave() {
    this.unsubscribe$?.next(null);
    this.unsubscribe$?.complete();
  }
}

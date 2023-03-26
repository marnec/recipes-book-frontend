import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemReorderEventDetail, ModalController } from '@ionic/angular';
import {
  debounceTime,
  filter,
  firstValueFrom,
  Observable,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';
import { EditComponent } from 'src/app/common/components/edit.abstract.component';
import {
  ID_PLACEHOLDER,
  IngredientModalDismissRoles,
} from 'src/app/common/constants';
import { IngredientSearchResult } from 'src/app/common/interfaces/nutritionix/search-ingredient-result.interface';
import { Recipe } from 'src/app/common/interfaces/recipe.interface';
import { IngredientsComponent } from 'src/app/ingredients/ingredients.component';
import { IngredientsService } from '../ingredients.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.page.html',
  styleUrls: ['./recipe-edit.page.scss'],
})
export class RecipeEditPage extends EditComponent<Recipe> {
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
      body: new FormControl(),
      title: new FormControl(),
      servings: new FormControl(),
      ingredients: new FormControl(),
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
            debounceTime(200)
          );
        }),
        filter(Boolean),
        switchMap((value) => {
          return this.recipesService.save(this.entity?.id, value);
        })
      )
      .subscribe();
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
    this.form?.setValue(
      {
        body: recipe?.body,
        title: recipe?.title,
        servings: recipe?.servings,
        ingredients: recipe?.ingredients,
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

  ionViewWillLeave() {
    this.unsubscribe$?.next(null);
    this.unsubscribe$?.complete();
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { omit, pick } from 'radash';
import { debounceTime, switchMap, takeUntil } from 'rxjs';
import { EditComponent } from 'src/app/common/components/edit.abstract.component';
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
      body: new FormControl(this.entity?.body),
      title: new FormControl(this.entity?.title),
      servings: new FormControl(this.entity?.servings),
    });

    this.form.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(200),
        switchMap((value) => {
          return this.recipesService.save(this.entity?.id, value);
        })
      )
      .subscribe();
  }

  public async openIngredientsList() {
    const modal = await this.modal.create({
      component: IngredientsComponent,
      initialBreakpoint: 0.75,
    });
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
  }

  ionViewWillLeave() {
    this.unsubscribe$?.next(null);
    this.unsubscribe$?.complete();
  }
}

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { filter, first, firstValueFrom, Subject, switchMap } from 'rxjs';
import { ID_PLACEHOLDER } from 'src/app/common/constants';
import { NullablePartial } from 'src/app/common/crud.service';
import { ListComponent } from '../../common/components/list.abstract.component';
import { Recipe } from '../../common/interfaces/recipe.interface';
import { RecipesService } from '../recipes.service';

export interface RecipeFilter extends Partial<Omit<Recipe, 'ingredients'>> {
  uid?: string;
}

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesPage extends ListComponent<Recipe, RecipeFilter> {
  idPlaceholder = ID_PLACEHOLDER;

  constructor(
    protected override entityService: RecipesService,
    protected override modal: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AngularFireAuth
  ) {
    super(entityService, modal);
  }

  override async ionViewWillEnter() {
    this.unsubscribe$ = new Subject();

    this.auth.user
      .pipe(
        filter(Boolean),
        first(),
        switchMap(({ uid }) => {
          return this.lazyLoad({ uid });
        })
      )
      .subscribe({
        next: (res) => this.lazyLoadSubscriber(res),
      });
  }

  private async createRecipe(): Promise<Recipe> {
    return firstValueFrom(
      this.entityService.save(null, { title: null, body: null })
    );
  }

  public async editRecipe(recipe?: Recipe) {
    if (!recipe) {
      recipe = await this.createRecipe();
    }
    this.router.navigate([recipe.id], { relativeTo: this.route });
  }
}

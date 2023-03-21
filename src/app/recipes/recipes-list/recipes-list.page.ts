import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ID_PLACEHOLDER } from 'src/app/common/constants';
import { NullablePartial } from 'src/app/common/crud.service';
import { ListComponent } from '../../common/components/list.abstract.component';
import { Recipe } from '../../common/interfaces/recipe.interface';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.page.html',
  styleUrls: ['./recipes-list.page.scss'],
})
export class RecipesPage extends ListComponent<Recipe> {
  idPlaceholder = ID_PLACEHOLDER;

  constructor(
    protected override entityService: RecipesService,
    protected override modal: ModalController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(entityService, modal);
  }

  addFilters(filters: NullablePartial<Recipe>): void {
    // throw new Error('Method not implemented.');
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

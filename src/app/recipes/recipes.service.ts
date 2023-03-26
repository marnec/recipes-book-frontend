import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { filter, first, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CrudService,
  NullablePartial,
  SortOrder,
} from '../common/crud.service';
import { BaseI } from '../common/interfaces/base.interface';
import { IngredientSearchResult } from '../common/interfaces/nutritionix/search-ingredient-result.interface';
import { PaginatedResult } from '../common/interfaces/paginates-result.interface';
import { Recipe } from '../common/interfaces/recipe.interface';
import { RecipeFilter } from './recipes-list/recipes-list.page';

const endpoint = `${environment.api}/recipes`;

const headers = new HttpHeaders().set('accept', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class RecipesService
  extends CrudService<Recipe, RecipeFilter>
  implements CrudService<Recipe, RecipeFilter>
{
  constructor(private http: HttpClient, private auth: AngularFireAuth) {
    super();
  }

  get(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${endpoint}/${id}`, { headers });
  }

  find(
    filter: RecipeFilter,
    page: number,
    size: number,
    sortField: keyof Recipe,
    sortOrder: SortOrder
  ): Observable<PaginatedResult<Recipe>> {
    const params = this.getPageableParams({
      page,
      size,
      sort: { [sortField]: sortOrder },
    }).appendAll({ ...filter } || {});

    return this.http.get<PaginatedResult<Recipe>>(endpoint, {
      headers,
      params,
    });
  }

  save(
    id: string | null | undefined,
    dto: Exclude<NullablePartial<Recipe>, BaseI>
  ): Observable<Recipe> {
    if (!id) {
      return this.auth.user.pipe(
        filter(Boolean),
        first(),
        switchMap(({ uid }) =>
          this.http.post<Recipe>(endpoint, { ...dto, uid })
        )
      );
    }
    return this.http.put<Recipe>(`${endpoint}/${id}`, dto, { headers });
  }

  associateIngredient(
    recipeId: string,
    ingredient: Partial<IngredientSearchResult>
  ): Observable<Recipe> {
    if ('tagId' in ingredient) {
      return this.http.put<Recipe>(
        `${endpoint}/${recipeId}/ingredients`,
        ingredient,
        {
          headers,
        }
      );
    }

    return this.http.post<Recipe>(
      `${endpoint}/${recipeId}/ingredients`,
      ingredient,
      {
        headers,
      }
    );
  }

  removeIngredient(id: string, ingredientId: string): Observable<Recipe> {
    return this.http.delete<Recipe>(
      `${endpoint}/${id}/ingredients/${ingredientId}`
    );
  }

  reorderIngredient(id: string, ingredientId: string, from: number, to: number) {
    return this.http.post(`${endpoint}/${id}`, { from, to, ingredientId }, { headers });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${endpoint}/${id}`, { headers });
  }
}

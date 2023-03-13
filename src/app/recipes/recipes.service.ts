import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService, SortOrder } from '../common/crud.service';
import { PaginatedResult } from '../common/interfaces/paginates-result.interface';
import { Recipe } from '../common/interfaces/recipe.interface';

const endpoint = `${environment.api}/recipes`;

const headers = new HttpHeaders().set('accept', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class RecipesService implements CrudService<Recipe> {
  constructor(private http: HttpClient) {}

  get(id: string): Observable<Recipe> {
    throw new Error('Method not implemented.');
  }
  find(
    filter: Partial<Recipe>,
    page: number,
    pageSize: number,
    sortField: keyof Recipe,
    sortOrder: SortOrder
  ): Observable<PaginatedResult<Recipe>> {
    
    const params = new HttpParams();
    for (const key in filter) {
      const value = filter[key as keyof typeof filter];
      if (value) {
        params.set(key, value);
      }
    }
    
    return this.http.get<PaginatedResult<Recipe>>(endpoint, {
      headers,
      params,
    });
  }
  save(id: string | null, dto: Partial<Recipe>): Observable<Recipe> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
}

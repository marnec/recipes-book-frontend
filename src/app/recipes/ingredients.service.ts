import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IngredientSearchResult } from '../common/interfaces/nutritionix/search-ingredient-result.interface';

const endpoint = `${environment.api}/ingredients`;

const headers = new HttpHeaders().set('accept', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  foundIngredients$ = new Subject<IngredientSearchResult[]>()

  constructor(private http: HttpClient) {}

  searchIngredient(searchInput: string): Observable<IngredientSearchResult[]> {
    const params = new HttpParams()
      .set('query', searchInput)
      .set('locale', 'it_IT');

    return this.http.get<IngredientSearchResult[]>(`${endpoint}`, {
      params,
      headers,
    });
  }
}

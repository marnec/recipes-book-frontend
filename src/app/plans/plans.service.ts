import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const endpoint = `${environment.api}/plans`;

const headers = new HttpHeaders().set('accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private http: HttpClient) { }

  addPlan(): Observable<any> {
    return this.http.post(endpoint, {}, {headers})
  }
}

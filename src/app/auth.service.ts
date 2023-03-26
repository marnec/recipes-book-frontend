import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  checkUserExists(uid: string): Promise<any> {
    return firstValueFrom(this.http.get(`${environment.api}/users/${uid}`));
  }
}

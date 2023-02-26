import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.interface';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  checkUserExists(uid: string): Promise<any> {
    return firstValueFrom(this.http.get(`${environment.api}/users/${uid}`));
  }
}

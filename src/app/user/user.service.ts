import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../common/interfaces/user.interface';

const endpoint = `${environment.api}/users`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  upsertUser(uid: string): Promise<User> {
    return firstValueFrom(
      this.http.put<User>(`${environment.api}/users/${uid}`, {})
    );
  }

  getSelf(uid: string): Observable<User> {
    return this.http.get<User>(`${endpoint}/${uid}`);
  }
}

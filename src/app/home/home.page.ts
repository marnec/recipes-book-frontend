import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { FirebaseUser } from '../common/interfaces/user.interface';
import { routes } from '../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sideMenuItems = routes.filter((route) => route.data?.['showInSideMenu']);

  constructor(private auth: AngularFireAuth) {}

  get user$(): Observable<FirebaseUser | null> {
    return this.auth.user;
  }
}

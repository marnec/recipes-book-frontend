import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { filter, first, switchMap, tap } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  constructor(
    private auth: AngularFireAuth,
    private userService: UserService
  ) {}

  ionViewWillEnter() {
    this.auth.user.pipe(
      filter(Boolean),
      first(),
      switchMap(({ uid }) => this.userService.getSelf(uid))
    );
  }
}

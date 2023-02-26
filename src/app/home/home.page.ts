import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { filter, Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private auth: AngularFireAuth,
    private authService: AuthService
  ) {}

  get user$(): Observable<User | null> {
    return this.auth.user;
  }

  ngOnInit(): void {
    this.user$.pipe(
      filter((user) => !!user),
      switchMap((user) => this.authService.checkUserExists((user as User).uid))
    ).subscribe();
  }
}

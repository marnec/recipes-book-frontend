import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { filter, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './common/interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private auth: AngularFireAuth,
    private authService: AuthService
  ) {}

  get user$(): Observable<User | null> {
    return this.auth.user;
  }

  ngOnInit(): void {
    this.user$
      .pipe(
        filter(Boolean),
        switchMap((user) => this.authService.checkUserExists(user.uid))
      )
      .subscribe();
  }
}

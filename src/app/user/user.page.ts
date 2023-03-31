import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, filter, first, switchMap, tap } from 'rxjs';
import { EditComponent } from '../common/components/edit.abstract.component';
import { ActivityLevel, DEFAULT_DEBOUNCE } from '../common/constants';
import { User } from '../common/interfaces/user.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage extends EditComponent<
  User,
  'id' | 'uid' | 'created' | 'modified' | 'email'
> {

  activityLevels = Object.keys(ActivityLevel)

  constructor(
    private auth: AngularFireAuth,
    private userService: UserService,
    protected override route: ActivatedRoute
  ) {
    super(route, userService);
  }

  override ionViewWillEnter() {
    let userUid: string;

    this.auth.user
      .pipe(
        filter(Boolean),
        first(),
        switchMap(({ uid }) => {
          userUid = uid;
          return this.userService.get(uid);
        }),
        switchMap((user) => {
          this.entity = user;

          this.form = new FormGroup({
            avatar: new FormControl(this.entity?.avatar),
            userName: new FormControl(this.entity?.userName),
            activityLevel: new FormControl(this.entity?.activityLevel || 0),
            age: new FormControl(this.entity?.age),
            gender: new FormControl(this.entity?.gender),
            height: new FormControl(this.entity?.height),
            weight: new FormControl(this.entity?.weight),
          });

          return this.form.valueChanges;
        }),
        debounceTime(DEFAULT_DEBOUNCE),
        switchMap((value) => this.userService.save(userUid, value))
      )
      .subscribe();
  }
}

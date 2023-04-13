import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, filter, first, switchMap, tap } from 'rxjs';
import { EditComponent } from '../common/components/edit.abstract.component';
import { activityLevels, DEFAULT_DEBOUNCE } from '../common/constants';
import { User } from '../common/interfaces/user.interface';
import { UserService } from './user.service';

import { Fitness, Gender, ReeVersion } from '../common/fitness.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage extends EditComponent<
  User,
  'id' | 'uid' | 'created' | 'modified' | 'email'
> {
  activityLevels = activityLevels;
  tdee: number | undefined;

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

          this.setTdee(user);

          return this.form.valueChanges;
        }),
        debounceTime(DEFAULT_DEBOUNCE),
        tap((value) => {
          this.setTdee(value as User);
        }),
        switchMap((value) => this.userService.save(userUid, value))
      )
      .subscribe();
  }

  setTdee(user: User) {
    const { gender, activityLevel, weight, height, age } = user;
    if (!!gender && !!weight && !!height && !!age) {
      this.tdee = Fitness.tdee(
        gender.toLowerCase() as Gender,
        ReeVersion.mifflinStJeor,
        Fitness.activityLevel(activityLevel),
        weight,
        height,
        age
      );
    }
  }
}

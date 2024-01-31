import { Component, Input } from '@angular/core';
import { IUser } from '../../../../entities/user/user.model';
import { IUsers } from '../../../../entities/users/users.model';

@Component({
  selector: 'jhi-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  currentUser?: IUsers;

  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');

    if (userString) {
      this.currentUser = JSON.parse(userString);
    }
  }
}

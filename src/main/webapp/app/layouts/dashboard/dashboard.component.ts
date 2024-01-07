import { Component } from '@angular/core';
import { IUser } from '../../admin/user-management/user-management.model';
import { IUsers } from '../../entities/users/users.model';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  currentUser?: IUsers;

  constructor() {}
  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');

    if (userString) {
      this.currentUser = JSON.parse(userString);
    }
  }
}

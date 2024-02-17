import { Component } from '@angular/core';

@Component({
  selector: 'jhi-navbar-users',
  templateUrl: './users-navbar.component.html',
  styleUrls: ['./users-navbar.component.scss'],
})
export class UsersNavbarComponent {
  showNotification() {}

  viewUserProfile() {}

  signOut() {}

  navigateTo(home: string) {}
}

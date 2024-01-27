import { Component, Input } from '@angular/core';
import { IUsers } from '../../../../entities/users/users.model';

@Component({
  selector: 'jhi-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  @Input() currentUser?: IUsers;
}

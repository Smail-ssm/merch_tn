import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'mercherLogin',
  templateUrl: './mlogin.component.html',
  styleUrls: ['./mlogin.component.scss'],
})
export class MloginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  authenticationError = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    console.log('username successful', this.username);
    console.log('password successful', this.password);

    if (this.username && this.password) {
      this.login(this.username, this.password, this.rememberMe);
    } else {
      console.error('Username or password is empty');
      this.authenticationError = true;
    }
  }

  login(username: string, password: string, rememberMe: boolean) {
    console.log('username successful', username);
    console.log('password successful', password);
  }
}

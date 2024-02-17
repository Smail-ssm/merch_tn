// mlogin.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../mercher/auth/auth.service';
import { UsersAuthService } from '../../mercher/auth/UsersAuth.service';
import { IUsers } from '../users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mercherLogin',
  templateUrl: './mlogin.component.html',
  styleUrls: ['./mlogin.component.scss'],
})
export class MloginComponent {
  authenticationError: boolean = false;
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response: AuthResponse) => {
        // Handle successful login, e.g., redirect to another page
        console.log('Login successful:', response);

        // Access the JWT token and user object from the response
        const jwtToken = response.token;
        const user = response.user;

        // You can store the token in localStorage or a cookie for future requests
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/dashboard/main']);

        // Redirect to another page or perform other actions as needed
        // Example: this.router.navigate(['/dashboard']);
      },
      error => {
        this.authenticationError = true;
        console.error('Login failed:', error);
      },
    );
  }
}

// Assuming you have a corresponding interface for the response structure
interface AuthResponse {
  token: string;
  user: IUsers; // Replace 'User' with the actual type of your user object
}

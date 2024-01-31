import { Component, Input, Output } from '@angular/core';
import { IUsers } from '../../../../entities/users/users.model';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @Output() currentUser?: IUsers;
  ordersPending: number = 10;
  totalProducts: number = 50;
  ordersProcessing: number = 20;
  totalItemsSold: number = 100;
  ordersCompleted: number = 30;
  totalEarnings: number = 5000; // Assume this is in dollars
  printJobsPending: number = 5;
  printJobsInProgress: number = 10;
  printJobsCompleted: number = 15;
  constructor() {}
  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');

    if (userString) {
      this.currentUser = JSON.parse(userString);
    }
  }
}

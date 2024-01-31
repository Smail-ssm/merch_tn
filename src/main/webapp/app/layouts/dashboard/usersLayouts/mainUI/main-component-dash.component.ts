import { Component, Input } from '@angular/core';
import { IUsers } from '../../../../entities/users/users.model';

@Component({
  selector: 'jhi-main',
  templateUrl: './main-component-dash.component.html',
  styleUrls: ['./main-component-dash.component.scss'],
})
export class MainComponentDash {
  @Input() currentUser?: IUsers;
  ordersPending: number = 10;
  totalProducts: number = 50;
  ordersProcessing: number = 20;
  totalItemsSold: number = 100;
  ordersCompleted: number = 30;
  totalEarnings: number = 5000; // Assume this is in dollars
  printJobsPending: number = 5;
  printJobsInProgress: number = 10;
  printJobsCompleted: number = 15;
  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');

    if (userString) {
      this.currentUser = JSON.parse(userString);
    }
  }

  performAction1() {}

  performAction2() {}
}

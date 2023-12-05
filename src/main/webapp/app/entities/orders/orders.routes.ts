import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OrdersComponent } from './list/orders.component';
import { OrdersDetailComponent } from './detail/orders-detail.component';
import { OrdersUpdateComponent } from './update/orders-update.component';
import OrdersResolve from './route/orders-routing-resolve.service';

const ordersRoute: Routes = [
  {
    path: '',
    component: OrdersComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrdersDetailComponent,
    resolve: {
      orders: OrdersResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrdersUpdateComponent,
    resolve: {
      orders: OrdersResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrdersUpdateComponent,
    resolve: {
      orders: OrdersResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default ordersRoute;

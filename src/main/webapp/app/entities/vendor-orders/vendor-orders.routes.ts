import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { VendorOrdersComponent } from './list/vendor-orders.component';
import { VendorOrdersDetailComponent } from './detail/vendor-orders-detail.component';
import { VendorOrdersUpdateComponent } from './update/vendor-orders-update.component';
import VendorOrdersResolve from './route/vendor-orders-routing-resolve.service';

const vendorOrdersRoute: Routes = [
  {
    path: '',
    component: VendorOrdersComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VendorOrdersDetailComponent,
    resolve: {
      vendorOrders: VendorOrdersResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VendorOrdersUpdateComponent,
    resolve: {
      vendorOrders: VendorOrdersResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VendorOrdersUpdateComponent,
    resolve: {
      vendorOrders: VendorOrdersResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default vendorOrdersRoute;

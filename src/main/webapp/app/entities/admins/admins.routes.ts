import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { AdminsComponent } from './list/admins.component';
import { AdminsDetailComponent } from './detail/admins-detail.component';
import { AdminsUpdateComponent } from './update/admins-update.component';
import AdminsResolve from './route/admins-routing-resolve.service';

const adminsRoute: Routes = [
  {
    path: '',
    component: AdminsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AdminsDetailComponent,
    resolve: {
      admins: AdminsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AdminsUpdateComponent,
    resolve: {
      admins: AdminsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AdminsUpdateComponent,
    resolve: {
      admins: AdminsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default adminsRoute;

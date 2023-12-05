import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'products',
        data: { pageTitle: 'Products' },
        loadChildren: () => import('./products/products.routes'),
      },
      {
        path: 'users',
        data: { pageTitle: 'Users' },
        loadChildren: () => import('./users/users.routes'),
      },
      {
        path: 'orders',
        data: { pageTitle: 'Orders' },
        loadChildren: () => import('./orders/orders.routes'),
      },
      {
        path: 'vendor-orders',
        data: { pageTitle: 'VendorOrders' },
        loadChildren: () => import('./vendor-orders/vendor-orders.routes'),
      },
      {
        path: 'admins',
        data: { pageTitle: 'Admins' },
        loadChildren: () => import('./admins/admins.routes'),
      },
      {
        path: 'roles',
        data: { pageTitle: 'Roles' },
        loadChildren: () => import('./roles/roles.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { errorRoute } from './layouts/error/error.route';

import HomeComponent from './home/home.component';
import NavbarComponent from './layouts/navbar/navbar.component';
import LoginComponent from './login/login.component';
import { MloginComponent } from './entities/users/mlogin/mlogin.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { UserProfileComponent } from './layouts/dashboard/usersLayouts/user-profile/user-profile.component';
import { MainComponentDash } from './layouts/dashboard/usersLayouts/mainUI/main-component-dash.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: MloginComponent,
          title: 'Sign in mercher',
          data: {
            hideNavbar: true,
          },
        },
        {
          path: 'dashboard',
          component: DashboardComponent,
          children: [
            { path: 'profile', component: UserProfileComponent },
            { path: 'main', component: MainComponentDash },
            // ... other child routes if needed
          ],
        },

        {
          path: '',
          children: [
            {
              path: '',
              component: NavbarComponent,
              outlet: 'navbar',
            },
            {
              path: 'admin',
              component: HomeComponent,
              title: 'Welcome, Java Hipster!',
            },
            {
              path: 'admin',
              data: {
                authorities: [Authority.ADMIN],
              },
              canActivate: [UserRouteAccessService],
              loadChildren: () => import('./admin/admin-routing.module'),
            },
            {
              path: 'account',
              loadChildren: () => import('./account/account.route'),
            },
            {
              path: 'login',
              component: LoginComponent,
              title: 'Sign in',
            },
            {
              path: '',
              loadChildren: () => import(`./entities/entity-routing.module`).then(({ EntityRoutingModule }) => EntityRoutingModule),
            },
          ],
        },
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED, bindToComponentInputs: true },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

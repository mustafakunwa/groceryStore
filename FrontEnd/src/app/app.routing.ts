import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { AuthGuard } from './services/authorization/authgaurd.service';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    loadChildren: './cart/cart.module#CartModule'
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: './orders/orders.module#OrdersModule'
  },
  {
    path: 'orderNow',
    canActivate: [AuthGuard],
    loadChildren: './order-now/order-now.module#OrderNowModule'
  }]
},
{
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
}];

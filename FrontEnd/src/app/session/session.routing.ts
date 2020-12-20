import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

export const SessionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  }
];

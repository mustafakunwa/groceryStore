import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './authentication.service';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService,
        private snackbarService: SnackbarService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getuserData();
        if (currentUser && currentUser) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['session/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
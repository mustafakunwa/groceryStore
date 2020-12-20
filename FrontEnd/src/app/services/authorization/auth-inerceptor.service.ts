import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, finalize, retry, filter, take, switchMap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './authentication.service';
import { environment } from '../../../environments/environment';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';
@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private injector: Injector,
        private snackbarService: SnackbarService,) { }
    auth = this.injector.get(AuthService);

    stopThisRequest: boolean = false;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var authRequest = this.addAuthenticationToken(request);

        return next.handle(authRequest).pipe(
            catchError(err => {
                if (err.status === 401) {
                    this.snackbarService.openSnackBar('error', "Session Expired");
                }
                else if (err.status == 0) {
                    this.snackbarService.openSnackBar('error', 'server connection lost');
                }
                else if (err.status == 404) {
                    this.snackbarService.openSnackBar('error', "Not Found");
                }
                else if (err.status == 400 || err.status == 403 || err.status == 409) {
                    this.snackbarService.openSnackBar('error', err.error.message);
                }
                else if (err.status == 500) {
                    this.snackbarService.openSnackBar('error', 'Internal Server Error');
                }
                const error = err || err.statusText;
                return throwError(error);
            }),
            finalize(
                () => { }
            )
        )

    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        if (!this.auth.getuserData() || !this.auth.getuserData()) {
            return request;
        }
        // If you are calling an outside domain then do not add the token.
        if (!request.url.match(environment.apiURL)) {
            return request;
        }
        if (!request.headers.has('Authorization')) {
            return request.clone({
                headers: request.headers.set("Authorization", this.auth.getuserData())
            });
        }
        return request;
    }

}

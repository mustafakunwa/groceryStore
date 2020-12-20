import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, finalize, retry, filter, take, switchMap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './authentication.service';
import { LoaderService } from './loader.service';

@Injectable()

export class LoaderInterceptorService implements HttpInterceptor {
    private totalRequests = 0;

    constructor(private injector: Injector,
        public loaderService: LoaderService,
    ) { }
    auth = this.injector.get(AuthService);

    stopThisRequest: boolean = false;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.totalRequests++;
        this.loaderService.show();

        return next.handle(request).pipe(
            finalize(
                () => this.decreaseRequests()
            )
        )

    }
    private decreaseRequests() {
        this.totalRequests--;
        if (this.totalRequests === 0) {
            this.loaderService.hide()
        }
    }


}

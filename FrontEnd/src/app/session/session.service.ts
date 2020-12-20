import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpBackend } from "@angular/common/http";
@Injectable({
    providedIn: "root",
})
export class SessionService {
    constructor(
        private http: HttpClient,
        private httpWithoutInterceptor: HttpClient,
        handler: HttpBackend
    ) {
        this.httpWithoutInterceptor = new HttpClient(handler);
    }

    register(data: any): Observable<any> {
        return this.httpWithoutInterceptor
            .post<any>(`${environment.apiURL}users`, data)
            .pipe(catchError(this.handleErrorObservable));
    }

    signIn(data: any): Observable<any> {
        return this.httpWithoutInterceptor
            .post<any>(`${environment.apiURL}users/login`, data)
            .pipe(catchError(this.handleErrorObservable));
    }

    logout(): Observable<any> {
        return this.http
            .post<any>(`${environment.apiURL}users/logout`, {})
            .pipe(catchError(this.handleErrorObservable));
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return throwError(error);
    }
}

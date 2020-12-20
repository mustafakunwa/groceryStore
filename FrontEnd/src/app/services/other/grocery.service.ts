import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class GrocercryService {
    constructor(private http: HttpClient) { }

    getAllItem(): Observable<any> {
        return this.http
            .get<any>(`${environment.apiURL}item`)
            .pipe(catchError(this.handleErrorObservable));
    }

    cart(data: any): Observable<any> {
        return this.http
            .post<any>(`${environment.apiURL}cart`, data)
            .pipe(catchError(this.handleErrorObservable));
    }

    getCart(): Observable<any> {
        return this.http
            .get<any>(`${environment.apiURL}cart`)
            .pipe(catchError(this.handleErrorObservable));
    }

    order(data: any): Observable<any> {
        return this.http
            .post<any>(`${environment.apiURL}order`, data)
            .pipe(catchError(this.handleErrorObservable));
    }

    getAllOrder(): Observable<any> {
        return this.http
            .get<any>(`${environment.apiURL}order`)
            .pipe(catchError(this.handleErrorObservable));
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return throwError(error);
    }
}

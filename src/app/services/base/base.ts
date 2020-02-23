import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { concatMap, timeout, catchError, retry, delay } from 'rxjs/operators';
import { Msg } from './msg.d';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const baseUrl = environment.apiBaseUrl
/**
 * Author: caili
 * Describe: 封装了一些网络请求的逻辑，方便统一处理前端所有的请求
 */
export class Base {
    header: HttpHeaders;


    constructor(public http: HttpClient) { }

    getHttpOptions(param) {
        return { headers: new HttpHeaders(), params: param, withCredentials: true};
    }

    Post(url: string, req?: any, param?: any): Observable<Msg> {
        url = baseUrl + url
        if (req == null || req == undefined) req = {};
        console.log(url + " [post req]=" + JSON.stringify(req))

        return this.http.post<Msg>(url, req, this.getHttpOptions(param)).pipe(
            catchError(this.handleError)
        );
    }

    Get(url: string, param?: any): Observable<Msg> {
        url = baseUrl + url
        console.log(param)
        return this.http.get<Msg>(url, this.getHttpOptions(param)).pipe(
            catchError(this.handleError)
        );
    }

    Put(url: string, req?: any, param?: any): Observable<Msg> {
        url = baseUrl + url
        if (req == null || req == undefined) req = {};
        return this.http.put(url, req, this.getHttpOptions(param)).pipe(
            catchError(this.handleError)
        );
    }


    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status},` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
}
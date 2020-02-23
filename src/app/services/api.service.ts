import { Injectable } from '@angular/core';
import { Base } from "./base/base"
import { Msg } from "./base/msg.d";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class ApiService extends Base {
    constructor(public http: HttpClient) {
        super(http)
    }

    PostApp(info: any): Observable<Msg> {
        return this.Post("app", info)
    }

    GetApp(): Observable<Msg> {
        return this.Get("app")
    }
    
    PostChangeSheet(info: any): Observable<Msg> {
        return this.Post("app/changeSheet", info)
    }

    GetChangeSheet(): Observable<Msg> {
        return this.Get("app/changeSheet")
    }
}

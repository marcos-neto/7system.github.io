import { SessionService } from './services/session.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: any;
}

@Injectable({
    providedIn: 'root'
})
export class System7HttpClient {

    public baseUrl = 'http://localhost:57972/api/';
    public headers = new HttpHeaders();

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.headers.set('Content-Type', 'application/json');
    }

    public Get<T>(endPoint: string, params?: any): Observable<T> {
        return this.http.get<T>(this.baseUrl + endPoint,
            {
                headers: this.headers,
                params: params
            }
        );
    }

    public Post<T>(endPoint: string, body: any, params?: any): Observable<T> {
        return this.http.post<T>(this.baseUrl + endPoint,
            body,
            {
                headers: this.headers, params: params
            }
        );
    }

    public Put<T>(endPoint: string, body: any, params?: any): Observable<T> {
        return this.http.put<T>(this.baseUrl + endPoint,
            body,
            {
                headers: this.headers, params: params
            }
        );
    }

    public Delete<T>(endPoint: string, params?: any): Observable<T> {
        return this.http.delete<T>(this.baseUrl + endPoint,
            {
                headers: this.headers, params: params
            }
        );
    }

    public Head<T>(endPoint: string, params?: any): Observable<T> {
        return this.http.head<T>(this.baseUrl + endPoint,
            {
                headers: this.headers, params: params
            }
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class ViaCepHttpClient {

    private baseUrl = 'https://viacep.com.br/ws/';
    private options: IRequestOptions;

    constructor(
        public http: HttpClient
    ) {

    }

    ngOnInit() {
        this.options.headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    public Get<T>(endPoint: string): Observable<T> {
        return this.http.get<T>(this.baseUrl + endPoint + '/json', this.options);
    }
}
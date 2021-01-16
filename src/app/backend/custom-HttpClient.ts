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

@Injectable()
export class System7HttpClient {

    public baseUrl = 'http://localhost:57972/api/';
    private options: IRequestOptions;

    constructor(
        private http: HttpClient, private session: SessionService
    ) {
    }

    ngOnInit() {

        this.options.headers.set('Content-Type', 'application/json');

        if (this.session.Token) {
            this.options.headers.set('Authorization', `Bearer ${this.session.Token}`);
        }
    }

    public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        return this.http.get<T>(this.baseUrl + endPoint, options);
    }

    public Post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        return this.http.post<T>(this.baseUrl + endPoint, params, options);
    }

    public Put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        return this.http.put<T>(this.baseUrl + endPoint, params, options);
    }

    public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        return this.http.delete<T>(this.baseUrl + endPoint, options);
    }
}

@Injectable()
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
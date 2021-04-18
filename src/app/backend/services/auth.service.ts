import { HttpHeaders } from '@angular/common/http';
import { System7HttpClient, IRequestOptions } from '../custom-HttpClient';
import { ICredentials, IRegister, IResetPassword, IToken } from '../models/authModels';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ISimplifiedClub } from '../Models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private uri: string = 'Auth';

    constructor(public http: System7HttpClient, private router: Router) { }


    login(credentials: ICredentials): Observable<IToken> {
        return this.http.Post<IToken>(`${this.uri}/Login`, credentials);
    }

    logout() {
        sessionStorage.removeItem('UserToken');
        this.router.navigate(['']);
    }

    forgotPassword(body: any, params?): Observable<any> {
        return this.http.Post(`${this.uri}/ForgotPassword`, body, params);
    }

    register(body: IRegister): Observable<any> {
        return this.http.Post(`${this.uri}/Register`, body);
    }

    isRegistered(params: any) {
        return this.http.Head(`${this.uri}/IsRegistered`, params);
    }

    resetPassword(body: IResetPassword): Observable<any> {
        return this.http.Post(`${this.uri}/ResetPassword`, body);
    }

    confirmAccount(body: any, params?): Observable<any> {
        return this.http.Post(`${this.uri}/ConfirmAccount`, body, params);
    }
}

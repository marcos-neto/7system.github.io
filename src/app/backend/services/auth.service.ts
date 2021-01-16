import { HttpHeaders } from '@angular/common/http';
import { System7HttpClient, IRequestOptions } from '../custom-HttpClient';
import { ICredentials, IRegister, IToken } from '../models/authModels';
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


    Login(email: string, password: string): Observable<IToken> {

        let credentials: ICredentials = {
            email: email,
            password: password,
            grantType: 'password'
        }

        return this.http.Post<IToken>(`${this.uri}/Login`, credentials);
    }

    Logout() {
        sessionStorage.removeItem('UserToken');
        this.router.navigate(['']);
    }

    ForgotPassword(email: string) {
        return this.http.Post(`${this.uri}/ForgotPassword`, email);

    }

    Register(params: IRegister): Observable<any> {
        return this.http.Post(`${this.uri}/Register`, params);
    }

    GetClubs(): Observable<ISimplifiedClub[]> {
        return this.http.Get<ISimplifiedClub[]>(`${this.uri}/Clubs`);
    }
}

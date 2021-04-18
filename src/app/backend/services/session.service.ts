import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor() {
    }

    get Token() {

        var token = sessionStorage.getItem('UserToken');

        if (token) {
            return token;
        }
        else {
            return null;
        }
    }
}
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { System7HttpClient } from "../custom-HttpClient";
import { IProvider } from "../Models";
import { SessionService } from "./session.service";

@Injectable({
    providedIn: 'root'
})
export class ProviderService {

    private uri: string = 'Providers';

    constructor(public http: System7HttpClient, private session: SessionService) { }

    getAll(): Observable<IProvider[]> {
        return this.http.Get<IProvider[]>(this.uri);
    }
}
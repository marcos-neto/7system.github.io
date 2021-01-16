import { IClub } from './../Models';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClubService {

    private uri: string = 'http://localhost:3000/';

    constructor(public http: HttpClient) { }

    GetAll(): Observable<IClub[]> {
        return this.http.get<IClub[]>(this.uri + 'Clubs');
    }
}
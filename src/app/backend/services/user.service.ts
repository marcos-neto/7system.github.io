import { async } from '@angular/core/testing';
import { IRegister } from './../models/authModels';
import { System7HttpClient } from '../custom-HttpClient';
import { OperationResponse } from './../operation-response';
import { HttpClient } from '@angular/common/http';
import { IUser, ISimplifiedUser } from './../Models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: System7HttpClient) { }

  private uri = 'Users';

  GetAll(): Observable<ISimplifiedUser[]> {
    return this.http.Get<ISimplifiedUser[]>(this.uri);
  }



  // Delete(userId: number): OperationResponse<any> {

  //   let response = new OperationResponse();
  //   this.loading = true;

  //   this.http.delete(this.uri + '/' + userId, { observe: 'response' }).subscribe(
  //     res => {
  //       response.result = res.body;
  //     },
  //     err => {
  //       response.add(err)
  //     })

  //   return response;
  // }
}

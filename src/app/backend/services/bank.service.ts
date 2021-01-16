import { IUserBank, ITransaction } from './../Models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private uri: string = 'http://localhost:3000/';

  constructor(public http: HttpClient) { }

  GetAll(): Observable<IUserBank[]> {
    return this.http.get<IUserBank[]>(this.uri + 'Bank');
  }

  AddAmount(transaction: ITransaction) {
    return this.http.post('Bank/Add', transaction);
  }

  RemoveAmount(transaction: ITransaction) {
    return this.http.post('Bank/Add', transaction);
  }
}

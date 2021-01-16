import { OperationResponse } from './../operation-response';
import { IRanking } from './../Models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { System7HttpClient } from '../custom-HttpClient';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  public loading: boolean = false;

  constructor(public http: System7HttpClient) { }

  GetAll(): Observable<IRanking[]> {
    return this.http.Get<IRanking[]>('Ranking');
  }

  GetRanking(): OperationResponse<IRanking[]> {

    let response = new OperationResponse<IRanking[]>();

    this.loading = true;

    this.http.Get<IRanking[]>('Ranking').subscribe(
      res => {
        response.result = res;
        this.loading = false;
      }, err => {
        this.loading = false;
        if (err.status == 400) {
          response.add(err.error)
        }
        else {
          response.add('Erro interno, procure o administrador');
        }
      });

    return response;
  }
}

import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { System7HttpClient } from '../custom-HttpClient';
import { ISchedule } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private uri: string = 'Schedules';

  constructor(public http: System7HttpClient, private session: SessionService) { }

  getAllSchedules(): Observable<ISchedule[]> {

    this.http.headers.append('Authorization', `Bearer ${this.session.Token}`)

    return this.http.Get<ISchedule[]>(this.uri);
  }

  createSchedule(schedule: ISchedule): Observable<ISchedule[]> {

    this.http.headers.append('Authorization', `Bearer ${this.session.Token}`)

    return this.http.Post<ISchedule[]>(this.uri, schedule);
  }
}

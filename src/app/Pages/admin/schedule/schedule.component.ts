import { CalendarColors } from 'app/common/Constantes';
import { LoaderService } from 'app/backend/services/loader.service';
import { ISchedule } from './../../../backend/Models';
import { ScheduleService } from './../../../backend/services/schedule.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Legend } from 'app/components/calendar-subtitle/calendar-subtitle.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  dataEvents: ISchedule[] = [];
  calendarOk: boolean = false;

  legends: Legend[] = [
    {
      name: 'Evento do Clube',
      color: CalendarColors.find(x => x.id === 1).primary
    },
    {
      name: 'Evento da Igreja',
      color: CalendarColors.find(x => x.id === 5).primary
    },
    {
      name: 'Evento da Area',
      color: CalendarColors.find(x => x.id === 2).primary
    },
    {
      name: 'Evento da Associação',
      color: CalendarColors.find(x => x.id === 3).primary
    },
    {
      name: 'Evento da Divisão',
      color: CalendarColors.find(x => x.id === 4).primary
    },
  ]

  constructor(
    private scheduleService: ScheduleService,
    private cdRef: ChangeDetectorRef,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.getEvents();
  }

  refreshCalendar() {
    this.getEvents();
  }

  getEvents() {
    this.loaderService.show();

    this.scheduleService.getAllSchedules().subscribe(res => {
      this.calendarOk = false;
      this.cdRef.detectChanges();
      this.dataEvents = res;
      this.loaderService.hide();
      this.calendarOk = true;
      this.cdRef.detectChanges();
    })
  }
}

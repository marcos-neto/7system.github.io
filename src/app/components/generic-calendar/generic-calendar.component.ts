import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { CustomDateFormatter } from './custon-date-formatter.provider';
import { CalendarColors } from 'app/common/Constantes';
import { ISchedule } from 'app/backend/Models';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailComponent } from 'app/dialogs/event-detail/event-detail.component';

@Component({
  selector: 'generic-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './generic-calendar.component.html',
  styleUrls: ['./generic-calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class GenericCalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  locale: string = 'pt';
  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SUNDAY, DAYS_OF_WEEK.SATURDAY];
  CalendarView = CalendarView;

  events: CalendarEvent[] = [];

  @Input() data: ISchedule[];
  @Output() refreshEvent = new EventEmitter();

  activeDayIsOpen: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.parseEvents();
  }

  parseEvents() {
    this.events = this.data.map((item) => {
      return {
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        title: item.title,
        allDay: item.allDay,
        color: CalendarColors.find(x => x.id === item.type),
        meta: item.description
      } as CalendarEvent
    })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  eventDetail($event) {
    this.dialog.open(EventDetailComponent, { data: $event, width: '500px' });
  }

  refresh() {
    this.refreshEvent.emit();
  }
}
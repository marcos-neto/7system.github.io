import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'calendar-subtitle',
  templateUrl: './calendar-subtitle.component.html',
  styleUrls: ['./calendar-subtitle.component.css']
})
export class CalendarSubtitleComponent implements OnInit {

  @Input() view: string;
  @Input() title: string;
  @Input() legends: Legend[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.view);
  }

}

export class Legend {
  name: string;
  color: string;
}

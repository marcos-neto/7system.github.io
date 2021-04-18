import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  @Input() control: FormControl;

  siteKey = '6Lcxs0waAAAAADJbaRGKpNcZUgm0FWTGik5sdSiP';

  constructor() { }

  ngOnInit(): void {
  }

}

import { LoaderService } from 'app/backend/services/loader.service';
import { Validations } from './../../../common/validations';
import { ISchedule } from './../../../backend/Models';
import { ScheduleService } from './../../../backend/services/schedule.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InputMaskService } from 'app/common/input-mask.service';
import { FormService } from 'app/backend/services/form.service';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  schedulingTypes: any[] = [
    { id: 1, name: 'Clube' },
    { id: 2, name: 'Area' },
    { id: 3, name: 'Associação' },
    { id: 4, name: 'Divisão' },
    { id: 5, name: 'Igreja' }
  ];

  allDayForm = new FormControl(false, Validators.required);
  formTitle = new FormControl('', Validators.required);

  constructor(
    private builder: FormBuilder,
    public mask: InputMaskService,
    private formService: FormService,
    private scheduleService: ScheduleService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
  }

  formCreateScheduling: FormGroup = this.builder.group({
    title: this.formTitle,
    initialDate: new FormControl(new Date(), Validators.required),
    endDate: new FormControl(new Date(), Validators.required),
    description: new FormControl('', Validators.required),
    schedulingType: new FormControl('', Validators.required),
    allDay: this.allDayForm
  }, {
    // validators: [Validations.ScheduleHourRequired]
  });

  saveScheduling() {

    this.loaderService.show();

    var schedule: ISchedule = {
      allDay: this.formCreateScheduling.get('allDay').value,
      description: this.formCreateScheduling.get('description').value,
      title: this.formCreateScheduling.get('title').value,
      type: this.formCreateScheduling.get('schedulingType').value.id,
      startDate: this.formCreateScheduling.get('initialDate').value,
      endDate: this.formCreateScheduling.get('endDate').value,
    }

    this.scheduleService.createSchedule(schedule).subscribe(res => {
      this.loaderService.hide();
    })
  }

  isCheckAllDay(value: any) {

    if (value.checked) {
      this.formCreateScheduling.get('hourIni').disable();
      this.formCreateScheduling.get('hourEnd').disable();
    } else {
      this.formCreateScheduling.get('hourIni').enable();
      this.formCreateScheduling.get('hourEnd').enable();
    }


  }

  requiredHour() {

  }
}

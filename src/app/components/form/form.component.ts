import { FormService } from './../../backend/services/form.service';
import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormConfig, FormField } from './form-config';
import { CustonNotification } from 'app/common/Notification';

@Component({
  selector: 'form-custom',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() config: FormConfig;
  @Output() submitForm = new EventEmitter();

  constructor(
    private formService: FormService,
    private notify: CustonNotification
  ) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.config.formGroup.valid) {
      this.submitForm.emit(this.config.formGroup);
    }
    else {
      this.notify.alert("Todos os campos devem ser preenchidos");
    }
  }

  getErroMessage(formControl: FormControl) {
    return this.formService.getErroMessage(formControl)
  }

  showHide(field: FormField) {
    field.showContent = !field.showContent;
  }

  getTypeInput(field: FormField) {

    switch (field.inputType) {
      case 'password':
        if (field.showContent) {
          return 'text';
        }
        else {
          return 'password'
        }

      default:
        return 'text';
    }
  }
}


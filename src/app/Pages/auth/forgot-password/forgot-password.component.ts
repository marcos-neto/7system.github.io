import { Router } from '@angular/router';
import { AuthService } from './../../../backend/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormConfig } from 'app/components/form/form-config';
import { CustonNotification } from 'app/common/Notification';
import { LoaderService } from 'app/backend/services/loader.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {

  formConfig: FormConfig = {
    submitButtonLabel: 'Recuperar senha',
    formGroup: this.createForm(),
    captcha: {
      formControlName: 'recaptcha'
    },
    formFields: [
      {
        autoComplete: false,
        displaysError: true,
        formControlName: 'email',
        inputType: 'text',
        placeholder: 'Email'
      }
    ]
  }

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private notify: CustonNotification,
    private router: Router,
    private loaderService: LoaderService) {
    this.loaderService.show();
  }

  ngAfterViewInit(): void {
    this.loaderService.hide();
  }

  ngOnInit(): void {

  }

  forgotPassword(form) {

    var params = {
      params: {
        email: form.value.email
      }
    }
    this.loaderService.show();

    this.authService.forgotPassword(null, params).subscribe(
      (res) => {
        this.notify.success(res.message);
        // this.loaderService.hide();

        setTimeout(() => {
          this.router.navigate(['login'])
        }, 2500);
      });
  }

  createForm(): FormGroup {
    return this.builder.group(
      {
        email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
        recaptcha: new FormControl('', Validators.required)
      });
  }

}

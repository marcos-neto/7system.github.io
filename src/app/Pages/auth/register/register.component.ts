import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthService } from './../../../backend/services/auth.service';
import { IRegister } from './../../../backend/models/authModels';
import { InputMaskService } from '../../../common/input-mask.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { CustonNotification } from 'app/common/Notification';
import * as _moment from 'moment';
import { ISimplifiedClub } from 'app/backend/Models';
import { Validations } from 'app/common/validations';
import { FormService } from 'app/backend/services/form.service';
import { FormConfig } from 'app/components/form/form-config';
import { config } from 'rxjs';
import { LoaderService } from 'app/backend/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  hidePassword = true;
  hideConfirmPassword = true;
  hasPasswordMatchs: boolean;
  socialUser: SocialUser = history.state.data;
  formConfig: FormConfig = {
    submitButtonLabel: 'Cadastrar',
    formGroup: this.createForm(),
    captcha: {
      formControlName: 'recaptcha'
    },
    formFields: [
      {
        autoComplete: false,
        displaysError: true,
        formControlName: 'fullName',
        inputType: 'text',
        placeholder: 'Nome Completo'
      },
      {
        autoComplete: false,
        displaysError: true,
        formControlName: 'email',
        inputType: 'text',
        placeholder: 'Email'
      },
      {
        autoComplete: false,
        displaysError: true,
        formControlName: 'password',
        inputType: 'password',
        placeholder: 'Senha',
        showContent: false
      },
      {
        autoComplete: false,
        displaysError: true,
        formControlName: 'confirmPassword',
        inputType: 'password',
        placeholder: 'Confirmar Senha',
        showContent: false
      },
    ]
  }

  constructor(public mask: InputMaskService,
    private authService: AuthService,
    private notify: CustonNotification,
    private builder: FormBuilder,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngAfterViewInit(): void {
    this.loaderService.hide();
  }

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return this.builder.group(
      {
        fullName: new FormControl(this.socialUser ? this.socialUser.name : '', Validators.compose([Validators.required, Validators.minLength(3)])),
        email: new FormControl(this.socialUser ? this.socialUser.email : '', Validators.compose([Validators.required, Validators.email])),
        password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)])),
        confirmPassword: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)])),
        recaptcha: new FormControl('', Validators.required)
      },
      {
        validator: Validations.PasswordsMatch
      })
  }

  register(form) {

    let registerModel: IRegister = {
      fullName: form.value.fullName,
      email: form.value.email,
      password: form.value.password
    }

    if (this.socialUser) {
      registerModel.provider = this.socialUser.provider;
      registerModel.socialId = this.socialUser.id;
    }

    this.loaderService.show();

    this.authService.register(registerModel).subscribe(
      res => {

        this.loaderService.hide();
        this.notify.success(res.message);

        setTimeout(() => {
          this.router.navigate(['login'])
        }, 1000);
      })
  }
}

import { LoaderService } from './../../../backend/services/loader.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustonNotification } from 'app/common/Notification';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { FormConfig } from 'app/components/form/form-config';
import { ICredentials } from 'app/backend/models/authModels';
import { LoginService } from 'app/backend/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  hidePassword: boolean = true;
  socialUser: SocialUser;

  constructor(
    private router: Router,
    private notification: CustonNotification,
    private socialAuthService: SocialAuthService,
    private loaderService: LoaderService,
    private builder: FormBuilder,
    private loginService: LoginService
  ) {
    this.validateUser();
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.loaderService.hide();
  }

  formConfig: FormConfig = {
    submitButtonLabel: 'Entrar',
    formGroup: this.createForm(),
    // captcha: {
    //   formControlName: 'recaptcha'
    // },
    formFields: [
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
        showContent: false,
        hint: {
          text: 'Esqueci minha senha',
          routerLink: '/forgot-password'
        }
      }
    ]
  }

  createForm() {
    return this.builder.group(
      {
        email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        // recaptcha: new FormControl('', Validators.required)
      })
  }

  validateUser() {

    let token = sessionStorage.getItem('UserToken');

    if (token) {
      this.router.navigate(['dashboard/']);
      return;
    }
  }

  passwordLogin(form) {

    let credentials: ICredentials = {
      email: form.value.email,
      password: form.value.password,
      grantType: 'password'
    }

    this.loginService.login(credentials);
  }

  async socialLogin(provider) {

    await this.socialAuthService.signIn(provider);

    this.socialAuthService.authState.subscribe(
      (res) => {
        let credentials: ICredentials = {
          email: res.email,
          grantType: 'social',
          socialId: res.id
        }

        this.loginService.login(credentials);
      },
      (err) => {
        this.loaderService.hide();
        this.notification.error(err);
      });
  }

  async signInGoogle() {
    await this.socialLogin(GoogleLoginProvider.PROVIDER_ID);
  }

  async signInFacebook() {
    await this.socialLogin(FacebookLoginProvider.PROVIDER_ID);
  }
}

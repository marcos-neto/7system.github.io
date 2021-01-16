import { AuthService } from './../../../backend/services/auth.service';
import { UserService } from './../../../backend/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { InputMaskService } from '../../../common/input-mask.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustonNotification } from 'app/common/Notification';
import { LoadingConfig } from 'app/common/Constantes';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true;
  public config = LoadingConfig;
  loading: boolean;
  socialUser: SocialUser;

  constructor(
    private router: Router,
    private notification: CustonNotification,
    public authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
  });

  ngOnInit(): void {
    this.validateUser();
  }

  validateUser() {

    let token = sessionStorage.getItem('UserToken');

    if (token) {
      this.router.navigate(['dashboard/']);
      return;
    }
  }

  login() {

    if (this.loginForm.valid) {
      this.authService.Login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        res => {
          sessionStorage.setItem('UserToken', res.token);
          this.router.navigate(['dashboard/']);
        }, err => {
          this.notification.showNotify(err, 'danger');
        })
    }
  }

  async signInGoogle() {
    await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((res) => {
      this.socialUser = res;
      console.log(res);
    });
  }

  async signInFacebook() {
    await this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((res) => {
      this.socialUser = res;
      console.log(res);
    });
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }
}

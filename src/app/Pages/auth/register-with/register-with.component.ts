import { AuthService } from './../../../backend/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ICredentials } from 'app/backend/models/authModels';
import { CustonNotification } from 'app/common/Notification';
import { LoaderService } from 'app/backend/services/loader.service';
import { param } from 'jquery';
import { LoginService } from 'app/backend/services/login.service';

@Component({
  selector: 'app-register-with',
  templateUrl: './register-with.component.html',
  styleUrls: ['./register-with.component.css']
})
export class RegisterWithComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private loaderService: LoaderService,
    private authService: AuthService,
    private loginService: LoginService) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  async signAndRedirect(provider) {
    this.loaderService.show();

    await this.socialAuthService.signIn(provider);

    this.socialAuthService.authState.subscribe((res: SocialUser) => {

      let params = {
        params: {
          email: res.email,
          socialId: res.id,
          provider: res.provider
        }
      }

      this.authService.isRegistered(params).subscribe(
        response => {

          this.loaderService.hide();
          var credentials: ICredentials = {
            email: res.email,
            grantType: 'social',
            socialId: res.id
          }

          this.loginService.login(credentials);
        },
        err => {
          this.loaderService.hide();
          this.router.navigate(['/register'], { state: { data: res } })
        }
      )
    });
  }

  async registerWithGoogle() {
    await this.signAndRedirect(GoogleLoginProvider.PROVIDER_ID);
  }

  async registerWithFacebook() {
    await this.signAndRedirect(FacebookLoginProvider.PROVIDER_ID);
  }

  registerWithEmail() {
    this.router.navigate(['/register']);
  }
}

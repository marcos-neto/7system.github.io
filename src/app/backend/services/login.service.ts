import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustonNotification } from 'app/common/Notification';
import { ICredentials } from '../models/authModels';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    public authService: AuthService) { }

  login(credentials: ICredentials) {
    this.loaderService.show();

    this.authService.login(credentials).subscribe(
      res => {
        this.loaderService.hide();
        sessionStorage.setItem('UserToken', res.token);
        this.router.navigate(['dashboard/']);
      })
  }
}

import { Router } from '@angular/router';
import { AuthService } from './../../../backend/services/auth.service';
import { IRegister } from './../../../backend/models/authModels';
import { InputMaskService } from '../../../common/input-mask.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustonNotification } from 'app/common/Notification';
import * as _moment from 'moment';
import { ISimplifiedClub } from 'app/backend/Models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  fullNameControl = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  emailControl = new FormControl('', Validators.compose([Validators.required, Validators.email]));
  birthDateControl = new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)]));
  phoneControl = new FormControl('', Validators.compose([Validators.required, Validators.minLength(9)]));
  clubControl = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));

  hidePassword = true;

  clubs: ISimplifiedClub[] = [];

  constructor(public mask: InputMaskService,
    private authService: AuthService,
    private notify: CustonNotification,
    private builder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getClubs();
  }

  getClubs() {
    this.authService.GetClubs().subscribe(res => {
      this.clubs = res;
    })
  }

  createForm() {
    this.registerForm = this.builder.group({
      fullName: this.fullNameControl,
      email: this.emailControl,
      birthDate: this.birthDateControl,
      phone: this.phoneControl,
      club: this.clubControl
    })

  }

  register() {

    if (!this.registerForm.valid) {
      this.notify.showNotify('Todos os campos precisão ser preenchidos', 'danger');
      return;
    }

    let registerModel: IRegister = {
      birthDate: this.registerForm.value.birthDate.toDate(),
      cellPhone: this.registerForm.value.phone,
      fullName: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      clubId: this.registerForm.value.club.id
    }


    this.authService.Register(registerModel).subscribe(
      res => {
        this.notify.showNotify(res.message, 'success');

        setTimeout(() => {
          this.router.navigate(['login'])
        }, 2500);
      },
      err => {
        this.notify.showNotify(err.error, 'danger');
      })
  }

}

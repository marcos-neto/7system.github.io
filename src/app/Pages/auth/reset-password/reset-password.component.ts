import { LoaderService } from './../../../backend/services/loader.service';
import { AuthService } from './../../../backend/services/auth.service';
import { IResetPassword } from './../../../backend/models/authModels';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Validations } from 'app/common/validations';
import { FormConfig } from 'app/components/form/form-config';
import { CustonNotification } from 'app/common/Notification';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  key: string;

  constructor(
    private builder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private notify: CustonNotification,
    private loader: LoaderService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => this.key = params['key']);
  }

  formConfig: FormConfig = {
    submitButtonLabel: 'Alterar Senha',
    formGroup: this.createForm(),
    captcha: {
      formControlName: 'recaptcha'
    },
    formFields: [
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

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return this.builder.group(
      {
        password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)])),
        confirmPassword: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6)])),
        recaptcha: new FormControl('', Validators.required)
      },
      {
        validator: Validations.PasswordsMatch
      })
  }

  resetPassword(form) {
    let resetModel: IResetPassword = {
      newPassword: form.value.password,
      token: this.key
    }

    this.loader.show();

    this.authService.resetPassword(resetModel).subscribe(
      res => {
        this.loader.hide();
        this.notify.success(res.message);

        setTimeout(() => {
          this.router.navigate(['login'])
        }, 1000);
      }
    )
  }
}

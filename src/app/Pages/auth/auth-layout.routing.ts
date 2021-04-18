import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterWithComponent } from './register-with/register-with.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'register-with', component: RegisterWithComponent },
    { path: 'reset-password/:key', component: ResetPasswordComponent },
    { path: 'confirm-account/:key', component: ConfirmAccountComponent }
];

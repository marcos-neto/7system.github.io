import { MatDatepickerModule } from '@angular/material/datepicker';
import { System7HttpClient, ViaCepHttpClient } from './backend/custom-HttpClient';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './Pages/admin/admin-layout.component';
import { AuthLayoutComponent } from './Pages/auth/auth-layout.component';
import { CookieService } from 'ngx-cookie-service';
import { NotFoundComponent } from './Pages/admin/not-found/not-found.component';
import { HttpClient } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { RequestInterceptorService } from './backend/services/request-interceptor.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
  },
};

registerLocaleData(localeBr, 'pt');
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    LoadingBarRouterModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    NotFoundComponent
  ],
  providers: [
    {
      provide: System7HttpClient,
      deps: [HttpClient]
    },
    {
      provide: ViaCepHttpClient,
      deps: [HttpClient]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '538590688296-njkm83dq57r8k1emv165rl1dvd5nsqn9.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('417894896330577')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR'
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

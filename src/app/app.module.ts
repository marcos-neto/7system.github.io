import { System7HttpClient, ViaCepHttpClient } from './backend/custom-HttpClient';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './Pages/admin/admin-layout.component';
import { AuthLayoutComponent } from './Pages/auth/auth-layout.component';
import { CookieService } from 'ngx-cookie-service';
import { NotFoundComponent } from './Pages/admin/not-found/not-found.component';
import { HttpClient } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';

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
    NgxLoadingModule.forRoot({}),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    NotFoundComponent
  ],
  providers: [
    CookieService,
    {
      provide: System7HttpClient,
      deps: [HttpClient]
    },
    {
      provide: ViaCepHttpClient,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

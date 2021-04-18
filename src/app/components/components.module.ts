import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { NgxLoadingModule } from 'ngx-loading';
import { DataGridComponent } from './data-grid/data-grid.component';
import { MatMenuModule } from '@angular/material/menu';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TextMaskModule } from 'angular2-text-mask';
import { CaptchaComponent } from './captcha/captcha.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { GenericCalendarComponent } from './generic-calendar/generic-calendar.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import localeFr from '@angular/common/locales/fr';
import localePt from '@angular/common/locales/PT';
import { CalendarSubtitleComponent } from './calendar-subtitle/calendar-subtitle.component';

registerLocaleData(localeFr);
registerLocaleData(localePt);
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    TextMaskModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    NgxCaptchaModule,
    MatButtonToggleModule,
    NgxLoadingModule.forRoot({}),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    BreadcrumbComponent,
    LoaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DataGridComponent,
    FormComponent,
    CaptchaComponent,
    GenericCalendarComponent,
    CalendarSubtitleComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    LoaderComponent,
    DataGridComponent,
    FormComponent,
    CaptchaComponent,
    GenericCalendarComponent,
    CalendarSubtitleComponent
  ]
})
export class ComponentsModule { }

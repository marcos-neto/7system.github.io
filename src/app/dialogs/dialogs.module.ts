import { PipesModule } from './../pipes/pipes.module';
import { MatDialogModule } from '@angular/material/dialog';
import { UploadImageComponent } from 'app/dialogs/upload-image/upload-image.component';
import { NewPhoneComponent } from './new-phone/new-phone.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { DeleteUserComponent } from 'app/dialogs/delete-user/delete-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TextMaskModule } from 'angular2-text-mask';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxLoadingModule } from 'ngx-loading';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
    MatDialogModule,
    PipesModule,
    NgxLoadingModule.forRoot({}),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    DeleteUserComponent,
    EventDetailComponent,
    NewPhoneComponent,
    UploadImageComponent
  ],
  exports: [
    DeleteUserComponent,
    EventDetailComponent,
    NewPhoneComponent,
    UploadImageComponent
  ]
})
export class DialogsModule { }

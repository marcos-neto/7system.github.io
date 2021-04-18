import { DialogsModule } from './../../dialogs/dialogs.module';
import { NewPhoneComponent } from './../../dialogs/new-phone/new-phone.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ComponentsModule } from '../../components/components.module';
import { BankComponent } from './bank/bank.component';
import { RankingComponent } from './ranking/ranking.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrPaginator } from '../../common/Paginator';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';

import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UploadImageComponent } from '../../dialogs/upload-image/upload-image.component';
import { NgxLoadingModule } from 'ngx-loading';
import { DeleteUserComponent } from '../../dialogs/delete-user/delete-user.component';
import { UserComponent } from 'app/Pages/admin/user/user.component';
import { ClubsComponent } from 'app/Pages/admin/clubs/clubs.component';
import { ClubComponent } from 'app/Pages/admin/club/club.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from 'app/backend/services/loader.service';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { MatBadgeModule } from '@angular/material/badge';
import { SocialLoginModule } from 'angularx-social-login';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { PipesModule } from '../../pipes/pipes.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatStepperModule,
    ImageCropperModule,
    MatProgressBarModule,
    ComponentsModule,
    MatBadgeModule,
    MatDatepickerModule,
    SocialLoginModule,
    MatSlideToggleModule,
    MatListModule,
    DialogsModule,
    NgxLoadingModule.forRoot({}),
    PipesModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UsersComponent,
    RankingComponent,
    BankComponent,
    UserComponent,
    ClubsComponent,
    ClubComponent,
    ScheduleComponent,
    SchedulingComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: BrPaginator }, LoaderService],
})

export class AdminLayoutModule { }

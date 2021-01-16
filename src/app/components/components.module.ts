import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { NgxLoadingModule } from 'ngx-loading';
import { DataGridComponent } from './data-grid/data-grid.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule,
    NgxLoadingModule.forRoot({}),
  ],
  declarations: [
    BreadcrumbComponent,
    LoaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DataGridComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    LoaderComponent,
    DataGridComponent
  ]
})
export class ComponentsModule { }

import { MenuConfig } from './../../_config/menu.config';
import { IUser } from './../../backend/Models';
import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { ClubImage, DefaultImage } from 'app/backend/mock';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];

  openProfileTab = false;
  currentUser: IUser;
  fullName = 'Marcos Cardoso';
  systemName = '7 System';
  clubImage = ClubImage.base64;
  userPicture = DefaultImage.base64;

  constructor(private menuConfig: MenuConfig, private router: Router) { }

  ngOnInit() {
    this.menuItems = this.menuConfig.menu.filter(menuItem => menuItem);
  }

  eventArea(event) {
    console.log(event);
  }

  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logOut() {
    sessionStorage.removeItem('UserToken');
    this.router.navigate(['/login']);
  }
}

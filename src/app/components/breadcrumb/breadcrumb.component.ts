
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {


  @Input() pages: BreadcrumbPage[];

  // menu = Menu;
  // pages = [];

  constructor(private _router: Router) { }

  ngOnInit(): void {
    // this.listenRouting();
  }

  // listenRouting() {
  //   let routerUrl: string,
  //     routerList: Array<any>,
  //     target: any;

  //   this._router.events.subscribe((router: any) => {

  //     routerUrl = router.urlAfterRedirects;

  //     if (routerUrl && typeof routerUrl === 'string') {

  //       target = this.menu;

  //       this.pages.length = 0;

  //       routerList = routerUrl.slice(1).split('/');

  //       routerList.forEach((router, index) => {

  //         target = target.find(page => page.path.slice(2) === router);

  //         this.pages.push({
  //           name: target.title,
  //           path: (index === 0) ? target.path : `${this.pages[index - 1].path}/${target.path.slice(2)}`
  //         });

  //         if (index + 1 !== routerList.length) {
  //           target = target.children;
  //         }
  //       });

  //       console.log(this.pages);
  //     }
  //   });
  // }

}

export interface BreadcrumbPage {
  name: string;
  route?: string;
  active: boolean;
}
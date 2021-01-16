import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {


  @Input() pages: BreadcrumbPage[];

  constructor() { }

  ngOnInit(): void {
  }

}

export interface BreadcrumbPage {
  name: string;
  route?: string;
  active: boolean;
}
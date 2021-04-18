import { ClubService } from '../../../backend/services/club.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IClub } from 'app/backend/Models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BreadcrumbPage } from 'app/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  breadcrumbPages: BreadcrumbPage[] = [
    { name: "Home", active: false, route: "/dashboard" },
    { name: "Clubes", active: true }
  ];

  clubs: IClub[];
  displayedColumns: string[] = ['name', 'responsible', 'district', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortable: MatSort;

  constructor(
    private clubService: ClubService
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.getClubs();
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteClub(club: any) {

  }

  getClubs() {
    this.clubService.GetAll().subscribe(
      res => {
        this.clubs = res;
        this.dataSource.data = res;
      },
      err => {
        console.log(err);
      }
    )
  }
}

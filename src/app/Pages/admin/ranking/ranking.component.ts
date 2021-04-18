import { BreadcrumbPage } from '../../../components/breadcrumb/breadcrumb.component';
import { IRanking } from '../../../backend/Models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RankingService } from 'app/backend/services/ranking.service';
import { CustonNotification } from 'app/common/Notification';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  breadcrumbPages: BreadcrumbPage[] = [
    { name: "Home", active: false, route: "/dashboard" },
    { name: "Ranking", active: true }
  ];

  displayedColumns: string[] = ["position", "name", "unity", "income"];
  dataSource: MatTableDataSource<IRanking>;

  ranking: IRanking[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(public rankingService: RankingService, private notification: CustonNotification) {


  }

  ngOnInit(): void {
    this.getRanking();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRanking() {
    this.rankingService.GetAll().subscribe(
      result => {
        this.ranking = result;
        this.dataSource = new MatTableDataSource<IRanking>(result);
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  // getRanking() {
  //   let response = this.rankingService.GetRanking();
  //   console.log(response.result);
  //   console.log(response);

  //   if (response.isSuccess) {
  //     this.ranking = response.result;
  //     this.dataSource.data = response.result;
  //   }
  //   else {
  //     this.notification.showNotify(response.messages.join('|'), 'danger');
  //   }
  // }

  isPodium(row: IRanking): boolean {

    if (row.position == 1 || row.position == 2 || row.position == 3) {
      return true;
    }

    return false;
  }

  getPodium(row: IRanking): string {
    if (row.position == 1) {
      return 'gold';
    }
    else if (row.position == 2) {
      return 'silver';
    }
    else if (row.position == 3) {
      return 'bronze';
    }
    else {
      return '';
    }
  }

}

import { DataGridConfig } from './data-grid-config';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, Output, ViewChild, EventEmitter, AfterViewInit, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  @Input() config: DataGridConfig;
  @Input() data: any[];

  @Output() resSelectLine = new EventEmitter();
  @Output() reloadTable = new EventEmitter();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('matSelect', { static: false }) matSelect: MatSelect;
  @ViewChild('matFormField', { static: false }) matFormField: MatFormField;

  tableDataSource = new MatTableDataSource<any>([]);
  selection: any[] = [];
  cols;

  constructor() { }

  ngOnInit(): void {
    this.tableDataSource.data = this.data;
    this.cols = this.config.displayColumns.map(x => x.field);

    if (this.config.useSortable) {
      this.tableDataSource.sort = this.sort;
    }

    if (this.verifyUsePaginator()) {
      this.tableDataSource.paginator = this.paginator;
    }
  }

  selectableLine(row) {
    var index = this.selection.indexOf(row);

    if (index === -1) {
      this.selection.push(row);
    }
    else {
      this.selection.splice(index, 1);
    }

    this.resSelectLine.emit(this.selection);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  isSelected(row) {
    if (this.selection.indexOf(row) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  verifyUsePaginator() {
    if (this.config.usePagination && this.config.page.totalElements > this.config.pageSize[0]) {
      return true;
    } else {
      return false;
    }
  }

  changePage(ev) {
    let returnPaginator = {
      previousPageIndex: ev.previousPageIndex,
      pageSize: ev.pageSize,
      pageIndex: ev.pageIndex,
      length: ev.length
    };

    this.reloadTable.emit(returnPaginator);
  }
}

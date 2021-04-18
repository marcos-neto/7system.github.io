import { ITransaction } from '../../../backend/Models';
import { BreadcrumbPage } from '../../../components/breadcrumb/breadcrumb.component';
import { CustonNotification } from '../../../common/Notification';
import { BankService } from '../../../backend/services/bank.service';
import { IUserBank } from '../../../backend/Models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class BankComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'amount'];
  dataSource = new MatTableDataSource<IUserBank>([]);
  selection = new SelectionModel<IUserBank>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  users: IUserBank[];
  selectUsers: boolean = false;
  formTransaction: FormGroup;

  breadcrumbPages: BreadcrumbPage[] = [
    { name: "Home", active: false, route: "/dashboard" },
    { name: "Banco", active: true }
  ];

  constructor(
    private bankService: BankService,
    private builder: FormBuilder,
    private notification: CustonNotification
  ) {
    if (window.matchMedia(`(min-width: 1024px)`).matches) {
      this.dataSource.paginator = this.paginator;
    }
  }

  createFormTransaction() {
    this.formTransaction = this.builder.group({
      amount: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      reason: new FormControl('', Validators.required),
      users: new FormControl([], Validators.minLength(1))
    })
  }

  ngOnInit(): void {
    this.createFormTransaction();
    this.getUsers();
    this.dataSource.sort = this.sort;
  }

  addTransaction(isAdd: boolean) {

    let isValid = this.validateTransaction();

    if (isValid) {

      let transaction: ITransaction = {
        amount: this.formTransaction.value.amount,
        reason: this.formTransaction.value.reason,
        users: this.selection.selected.map(x => x.userId)
      }

      if (isAdd) {
        this.bankService.AddAmount(transaction).subscribe(
          res => {
            this.getUsers();
          },
          err => {
            this.notification.show(err.error, 'danger');
          }
        );
      }
      else {
        this.bankService.RemoveAmount(transaction).subscribe(
          res => {
            this.getUsers();
          },
          error => {

          }
        );
      }
    }
  }

  validateTransaction(): boolean {
    if (this.formTransaction.invalid) {
      this.notification.show("Os campos, 'Valor' e 'Justificativa' são obrigatórios", "danger");
      return false;
    }

    if (this.selection.selected.length == 0) {
      this.notification.show("Selecione pelo menos um usuario", "danger");
      return false;
    }

    return true;
  }

  getUsers() {
    this.bankService.GetAll().subscribe(res => {
      this.dataSource.data = res;
    },
      error => {
        console.log(error);
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: IUserBank): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.userId + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
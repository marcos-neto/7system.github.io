import { CustonNotification } from '../../../common/Notification';
import { UserService } from '../../../backend/services/user.service';
import { BreadcrumbPage } from '../../../components/breadcrumb/breadcrumb.component';
import { IUser, ISimplifiedUser } from '../../../backend/Models';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteUserComponent } from 'app/dialogs/delete-user/delete-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userToEdit: IUser;

  breadcrumbPages: BreadcrumbPage[] = [
    { name: "Home", active: false, route: "/dashboard" },
    { name: "Usuários", active: true }
  ];

  displayedColumns: string[] = ['fullName', 'email', 'roleName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<ISimplifiedUser>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortable: MatSort;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private notification: CustonNotification,
    private router: Router
  ) {

    this.getUsers();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortable;
  }

  deleteUser(user: any): void {

    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '500px',
      data: { userId: user.id, fullName: user.fullName }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result && result === true) {
        this.notification.show('Usuário Deletado', 'success');
        this.getUsers();
      }

      // this.animal = result;
    }, err => {
      console.log(err);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() {
    this.userService.GetAll().subscribe(
      ress => {
        this.dataSource = new MatTableDataSource(ress);
        console.log(ress);
      },
      error => {
        console.log(error);
      }
    )
  }
}
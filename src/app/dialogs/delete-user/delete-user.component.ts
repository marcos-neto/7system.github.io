import { UserService } from './../../backend/services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteUserModel,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmDelete() {

    //deleta o usuario

    // let response = this.userService.Delete(this.data.userId)

    // if (response.isSuccess) {
    //   this.dialogRef.close(true);
    // }
    // else {
    //   this.dialogRef.close(false);
    // }

  }
}

export interface DeleteUserModel {
  userId: number;
  fullName: string;
}
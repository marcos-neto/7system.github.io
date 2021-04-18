import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-phone',
  templateUrl: './new-phone.component.html',
  styleUrls: ['./new-phone.component.css']
})
export class NewPhoneComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewPhoneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewPhoneModel
  ) {

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface NewPhoneModel {
  description: string;
  number: string;
  isWhatsapp: boolean;
}
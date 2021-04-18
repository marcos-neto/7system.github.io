import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CustonNotification } from 'app/common/Notification';
import { LoadingConfig } from 'app/_config/loading.config';

declare var $: any;
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  public loading = false;
  fileName: string;
  isMobile: boolean = false;

  public config = LoadingConfig;
  imageChangedEvent: any = '';

  constructor(
    private notification: CustonNotification,
    public dialogRef: MatDialogRef<UploadImageComponent>, @Inject(MAT_DIALOG_DATA) public data: UploadImageModel) {

    const window_width = $(window).width();

    if (window_width < 700) {
      this.isMobile = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    console.log(event);

    if (event && event.target.files[0]) {
      if (event.target.files[0].type != 'image/jpeg' && event.target.files[0].type != 'image/png') {
        this.notification.error("Formato da imagem inválido");
        return;
      }
    }
    this.imageChangedEvent = event;
    this.loading = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.data.croppedImage = event.base64;
  }

  imageLoaded() {
    this.loading = false;
  }

  loadImageFailed() {
    this.notification.error("Erro ao carregar imagem");
    this.loading = false;
  }

}

export interface UploadImageModel {
  title: string;
  croppedImage: any;
}

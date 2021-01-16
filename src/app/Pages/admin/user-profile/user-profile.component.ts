import { UserService } from '../../../backend/services/user.service';
import { ViacepService } from '../../../backend/services/viacep.service';
import { InputMaskService } from '../../../common/input-mask.service';
import { IUser, IViaCep } from '../../../backend/Models';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbPage } from '../../../components/breadcrumb/breadcrumb.component';
import { CustonNotification } from 'app/common/Notification';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageComponent } from 'app/dialogs/upload-image/upload-image.component';

declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  breadcrumbPages: BreadcrumbPage[] = [
    { name: "Home", active: false, route: "/dashboard" },
    { name: "Perfil", active: true }
  ];

  formCurrentUser: FormGroup;
  currentUser: IUser;
  //  = {
  //   id: 1,
  //   fullName: "Marcos Cardoso de Oliveira Neto",
  //   role: "Diretor Associado",
  //   username: "marcos.cardoso",
  //   details: {
  //     email: "marcos.cardoso@gmail.com",
  //     cellphone: "19981739047",
  //     birthDate: "22/09/1993",
  //     clubName: "Identidade 7",
  //     aboutMe: "",
  //     address: {
  //       UF: "SP",
  //       city: "Hortolândia",
  //       complement: "Apt 304 B",
  //       district: "Novo Cambuí",
  //       number: "65",
  //       street: "Rua 1",
  //       zipCode: 13187200
  //     }
  //   },
  // };

  openAddress: boolean = false;
  isMobile = false;

  constructor(
    public mask: InputMaskService,
    private builder: FormBuilder,
    private viaCepService: ViacepService,
    private userService: UserService,
    private notification: CustonNotification,
    private dialog: MatDialog
  ) {

    const window_width = $(window).width();

    if (window_width < 700) {
      this.isMobile = true;
    }

  }

  ngOnInit() {
    this.createUserForm();

    if (this.currentUser.details.address) {
      this.openAddress = true;
    }
  }

  save() {
    console.log(this.formCurrentUser.value);
    this.notification.showNotify('Usuario salvo', 'success');
  }

  createUserForm() {
    this.formCurrentUser = this.builder.group({
      id: new FormControl(this.currentUser.id),
      fullName: new FormControl(
        this.currentUser.fullName,
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        )),
      email: new FormControl(
        this.currentUser.details.email,
        Validators.compose(
          [
            Validators.email
          ]
        )
      ),
      cellphone: new FormControl(this.currentUser.details.cellphone),
      birthDate: new FormControl(this.currentUser.details.birthDate, Validators.required),
      clubName: new FormControl({ value: this.currentUser.details.clubName, disabled: true }),
      aboutMe: new FormControl(this.currentUser.details.aboutMe, Validators.maxLength(144)),
      zipCode: new FormControl(this.currentUser.details.address.zipCode),
      complement: new FormControl(this.currentUser.details.address.complement),
      addressNumber: new FormControl(this.currentUser.details.address.number),
      district: new FormControl({ value: this.currentUser.details.address.district, disabled: true }),
      uf: new FormControl({ value: this.currentUser.details.address.UF, disabled: true }),
      street: new FormControl({ value: this.currentUser.details.address.street, disabled: true }),
      city: new FormControl({ value: this.currentUser.details.address.city, disabled: true }),

    })
  }

  getCep(zipCode: string) {

    const zipcodeFormated = zipCode.replace("-", "");

    if (zipcodeFormated.length == 8) {
      this.viaCepService.getAddress(zipcodeFormated).subscribe(
        (viacep: IViaCep) => {
          this.setAddress(viacep);
        });
    }
  }

  setAddress(address: IViaCep) {
    this.formCurrentUser.controls['street'].setValue(address.logradouro);
    this.formCurrentUser.controls['district'].setValue(address.bairro);
    this.formCurrentUser.controls['city'].setValue(address.localidade);
    this.formCurrentUser.controls['UF'].setValue(address.uf);
  }

  showNotification(message, type) {

    $.notify({
      icon: "notifications",
      message: message

    }, {
      type: type,
      timer: 1000,
      placement: {
        from: 'top',
        align: 'right'
      },
      template: '<div data-notify="container" class="col-xl-2 col-lg-2 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '</div>'
    });
  }

  changeImageProfile(): void {
    const dialogRef = this.dialog.open(UploadImageComponent, {
      width: '500px',
      data: { title: 'Alterar imagem de perfil', croppedImage: this.currentUser.image }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentUser.image = result.croppedImage;
    });
  }
}
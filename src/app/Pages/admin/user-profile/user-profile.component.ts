import { LoaderService } from './../../../backend/services/loader.service';
import { NewPhoneComponent } from './../../../dialogs/new-phone/new-phone.component';
import { UserService } from '../../../backend/services/user.service';
import { ViacepService } from '../../../backend/services/viacep.service';
import { InputMaskService } from '../../../common/input-mask.service';
import { IUser, IViaCep } from '../../../backend/Models';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadcrumbPage } from '../../../components/breadcrumb/breadcrumb.component';
import { CustonNotification } from 'app/common/Notification';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageComponent } from 'app/dialogs/upload-image/upload-image.component';
import { DataGridConfig } from 'app/components/data-grid/data-grid-config';
import { SocialAuthService } from 'angularx-social-login';
import { DefaultImage } from 'app/backend/mock';

declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  resOkPhones = false;
  breadcrumbPages: BreadcrumbPage[] = [
    { name: "Home", active: false, route: "/dashboard" },
    { name: "Perfil", active: true }
  ];

  tablePhoneConfig: DataGridConfig = {
    dateformat: 'dd/MM/yyyy',
    useFilter: false,
    usePagination: false,
    useSelect: false,
    useSortable: false,
    displayColumns: [
      {
        field: 'description',
        displayName: 'Descrição'
      },
      {
        field: 'number',
        displayName: 'Número do telefone'
      },
      {
        field: 'isWhatsapp',
        displayName: 'WhatsApp',
        type: 'boolean'
      },
      {
        field: 'action',
        type: 'action'
      }
    ],
    lineActions: [
      {
        label: 'Editar',
        color: 'warning',
        icon: 'edit',
        action: (a) => this.editPhone(a)
      },
      {
        label: 'Deletar',
        color: 'warn',
        icon: 'delete_outline',
        action: (a) => this.deletePhone(a)
      }
    ]
  }



  accordionOpened = false;

  formCurrentUser: FormGroup;
  currentUser: IUser = {
    id: 1,
    fullName: "Marcos Cardoso de Oliveira Neto",
    roleName: "Diretor Associado",
    email: "marcos.cardoso@gmail.com",
    details: {
      email: "marcos.cardoso@gmail.com",
      cellphone: "19981739047",
      birthDate: "22/09/1993",
      clubName: "Identidade 7",
      aboutMe: "",
      address: {
        UF: "SP",
        city: "Hortolândia",
        complement: "Apt 304 B",
        district: "Novo Cambuí",
        number: "65",
        street: "Rua 1",
        zipCode: 13187200
      }
    },
    image: DefaultImage.base64
  };

  openAddress: boolean = false;
  isMobile = false;
  linkedGoogle = false;
  linkedFacebook = false;

  webSocials = [
    {
      socialName: 'Google',
      isLinked: true
    },
    {
      socialName: 'Facebook',
      isLinked: false
    }
  ]

  userPhones = [];

  displayedColumns: string[] = ['socialName', 'isLinked', 'actions'];

  constructor(
    public mask: InputMaskService,
    private builder: FormBuilder,
    private viaCepService: ViacepService,
    private userService: UserService,
    private notification: CustonNotification,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private loader: LoaderService
    // private socialAuthService: SocialAuthService,
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

    this.userPhones = [
      {
        description: 'Telefone de Teste 1',
        number: '(19) 98173-9047',
        isWhatsapp: true
      },
      {
        description: 'Telefone de Teste 2',
        number: '(19) 98173-9047',
        isWhatsapp: false
      }
    ]

    this.resOkPhones = true;
    this.cdRef.detectChanges();
  }

  save() {
    console.log(this.formCurrentUser.value);
    this.notification.success('Usuario salvo');
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
      birthDate: new FormControl(this.currentUser.details.birthDate),
      aboutMe: new FormControl(this.currentUser.details.aboutMe, Validators.maxLength(144))
    })
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

  changeSocialStatus(row) {
    row.isLinked = !row.isLinked;
  }

  deletePhone(a: any): void {

    this.loader.show();
    this.resOkPhones = false;
    this.cdRef.detectChanges();
    let index = this.userPhones.indexOf(a);

    this.userPhones.splice(index, 1);

    this.loader.hide();
    this.resOkPhones = true;
    this.cdRef.detectChanges();
  }

  editPhone(a: any): void {
    var index = this.userPhones.indexOf(a);

    const dialogRef = this.dialog.open(NewPhoneComponent, {
      width: '400px',
      data: this.userPhones[index]
    });


    dialogRef.afterClosed().subscribe(result => {
      this.resOkPhones = false;
      this.cdRef.detectChanges();
      // this.userPhones.push(result);

      this.resOkPhones = true;
      this.cdRef.detectChanges();
    });
  }

  addPhone(): void {
    const dialogRef = this.dialog.open(NewPhoneComponent, {
      width: '400px',
      data: { description: '', number: '', isWhatsapp: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.resOkPhones = false;
      this.cdRef.detectChanges();
      this.userPhones.push(result);

      this.resOkPhones = true;
      this.cdRef.detectChanges();
    });
  }

  // async socialLogin(provider) {
  //   await this.socialAuthService.signIn(provider);

  //   this.socialAuthService.authState.subscribe(
  //     (res) => {

  //     },
  //     (err) => {
  //     });
  // }
}

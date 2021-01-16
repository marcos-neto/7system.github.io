import { IUser, IViaCep } from '../../../backend/Models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbPage } from 'app/components/breadcrumb/breadcrumb.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ViacepService } from 'app/backend/services/viacep.service';
import { InputMaskService } from 'app/common/input-mask.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  breadcrumbPages: BreadcrumbPage[] = [
    { name: "Home", active: false, route: "/dashboard" },
    { name: "Usuários", active: false, route: "/users" }
  ];

  isNew: boolean = true;
  formUser: FormGroup;
  user: IUser;

  clubs: any[] = [{ id: 1, name: 'Identidade 7' }]

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private viaCepService: ViacepService,
    public mask: InputMaskService
  ) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      res => {
        console.log(res);

        if (res.userId) {
          this.isNew = false;
          this.breadcrumbPages.push({ name: 'Editar', active: true });

        } else {
          this.breadcrumbPages.push({ name: 'Novo', active: true });
        }

      }
    );

    this.createForm();
  }

  createForm() {
    this.formUser = this.builder.group({
      id: new FormControl(this.user.id),
      fullName: new FormControl(
        this.user.fullName,
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ]
        )),
      email: new FormControl(
        this.user.details.email,
        Validators.compose(
          [
            Validators.email
          ]
        )
      ),
      cellphone: new FormControl(this.user.details.cellphone),
      birthDate: new FormControl(this.user.details.birthDate, Validators.required),
      clubName: new FormControl({ value: this.user.details.clubName }),
      zipCode: new FormControl(this.user.details.address.zipCode),
      complement: new FormControl(this.user.details.address.complement),
      addressNumber: new FormControl(this.user.details.address.number),
      district: new FormControl({ value: this.user.details.address.district, disabled: true }),
      uf: new FormControl({ value: this.user.details.address.UF, disabled: true }),
      street: new FormControl({ value: this.user.details.address.street, disabled: true }),
      city: new FormControl({ value: this.user.details.address.city, disabled: true })
    })
  }

  saveUser() {

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
    this.formUser.controls['street'].setValue(address.logradouro);
    this.formUser.controls['district'].setValue(address.bairro);
    this.formUser.controls['city'].setValue(address.localidade);
    this.formUser.controls['UF'].setValue(address.uf);
  }

}

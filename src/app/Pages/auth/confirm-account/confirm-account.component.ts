import { param } from 'jquery';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/backend/services/auth.service';
import { LoaderService } from 'app/backend/services/loader.service';
import { CustonNotification } from 'app/common/Notification';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {

  key: string;
  message: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private notify: CustonNotification,
    private loader: LoaderService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    this.activatedRoute.params.subscribe(params => this.key = params['key']);
  }

  ngOnInit(): void {
    this.confirmAccount();
  }

  confirmAccount() {
    this.loader.show();

    let params = {
      params: {
        token: this.key
      }
    }

    this.authService.confirmAccount(null, params).subscribe(res => {
      this.message = res.message;
      this.cdRef.detectChanges();
    })
  }

}

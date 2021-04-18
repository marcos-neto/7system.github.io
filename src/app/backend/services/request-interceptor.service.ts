import { LoaderService } from 'app/backend/services/loader.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from "@angular/common/http";
import { Observable } from 'rxjs';
import { CustonNotification } from 'app/common/Notification';
import { tap } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(
    private notify: CustonNotification,
    private authService: AuthService,
    private loaderService: LoaderService,
    private session: SessionService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.session.Token) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.session.Token}`,
        },
      });
    }

    return next.handle(req)
      .pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {

              //   if (event.body && event.body.message) {
              //     let exeptionUrl = event.url.indexOf("count");

              //     if (exeptionUrl === -1) {

              //       this.notifyResponseService.veryfyTypeNotify(event.body.typeResponse, event.body.message);
              //     }
              //   }
            }
          },
          error => {
            this.loaderService.hide();

            this.parceError(error);
          })
      )
  }

  async parceError(result) {

    switch (result.status) {
      case 0:
        this.notify.error("Serviço Indisponível");
        break;

      case 500:
        this.notify.error("Problema interno ao atender a solicitação");
        break;

      case 401:

        this.notify.error("Sessão Expirada. A pagina sera atualizada Automaticamente!");

        setTimeout(() => {

          this.authService.logout();
        }, 1000);

        break;

      case 400:

        var msg;

        if (!result.error.message) {

          msg = result.error.message;

        } else {
          msg = result.error.message.join(' | ');
        }

        this.notify.alert(msg);

        break;

      default:

        var msg;

        if (!result.error.message) {
          this.notify.error("Erro ao atender a solicitação");
          break;
        }

        if (typeof result.error.message === 'string') {

          msg = result.error.message;

        } else {
          msg = result.error.message.join(' | ');
        }

        this.notify.error(msg);
        break;
    }

  }
}

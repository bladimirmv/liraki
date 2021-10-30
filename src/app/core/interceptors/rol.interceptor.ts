import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr'
import { catchError } from 'rxjs/operators';

@Injectable()
export class RolInterceptor implements HttpInterceptor {

  constructor(private toastrSvc: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    // const authToken = this.authSvc.userTokenValue;
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${'authToken'}`
      }
    });


    return next.handle(authRequest).pipe(
      catchError((httpError: HttpErrorResponse) => {


        let errorMessage = '';

        if (httpError.error.message) {
          if (typeof httpError.error.message === 'string') {
            switch (httpError.status) {
              case 401:
                // this.authSvc.logout();
                this.toastrSvc.warning('La sesion ha expirado, porfavor inicia sesion nuevamente', 'Sesion Expirada!', {
                  timeOut: 7000
                });
                break;
            }
          } else if (httpError.error.message.errno) {
            switch (httpError.error.message.errno) {
              case -111:
                errorMessage = 'No se ha podido establecer una conexion con la base de datos. 🙁';
                this.toastrSvc.error(errorMessage, 'Ocurrio un Error!', {
                  timeOut: 7000,
                  enableHtml: true
                });
                break;
            }
          }
        }
        return throwError(httpError);
      }));


  }
}

import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PedidoProducto } from '@models/liraki/pedido.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoProductoService {
  private API_URL = environment.API_URL;

  constructor(private htpp: HttpClient, private toastrSvc: ToastrService) {}

  public addPedidoProducto(pedidoProducto: PedidoProducto): Observable<any> {
    return this.htpp
      .post<PedidoProducto>(
        `${this.API_URL}/api/pedidoProducto`,
        pedidoProducto
      )
      .pipe(catchError((err) => this.handdleError(err)));
  }

  public handdleError(httpError: HttpErrorResponse | any): Observable<never> {
    let errorMessage = '';

    if (httpError.error.message) {
      if (typeof httpError.error.message === 'string') {
        errorMessage = `${httpError.error.message}`;
      } else if (httpError.error.message.errno) {
        switch (httpError.error.message.errno) {
          case -111:
            errorMessage =
              'No se ha podido establecer una conexion con la base de datos. 🙁';
            break;
          case 1451:
            errorMessage = 'No se pudo eliminar el pedido. 🙁';
            break;
          default:
            errorMessage = `
            Error: ${httpError.statusText} </br>
            Status: ${httpError.status}`;
            break;
        }
      }
    }
    console.log('this error', httpError);
    this.toastrSvc.error(errorMessage, 'Ocurrio un Error!', {
      timeOut: 7000,
      enableHtml: true,
    });
    return throwError(httpError);
  }
}

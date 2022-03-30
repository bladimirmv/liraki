import {
  VentaView,
  VentaProducto,
  estado,
} from '@models/liraki/venta.interface';
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
export class VentaService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private toastrSvc: ToastrService) {}

  public addVentaFisica(venta: VentaProducto): Observable<any> {
    return this.http
      .post<PedidoProducto>(`${this.API_URL}/api/venta/fisica`, venta)
      .pipe(catchError((err) => this.handdleError(err)));
  }
  public getPedidoProductoByUuid(uuid: string): Observable<any> {
    return this.http
      .get<PedidoProducto>(`${this.API_URL}/api/pedidoProducto/${uuid}`)
      .pipe(catchError((err) => this.handdleError(err)));
  }

  public getAllVentaFisica(): Observable<VentaView[]> {
    return this.http
      .get<VentaView[]>(`${this.API_URL}/api/venta/fisica`)
      .pipe(catchError((err) => this.handdleError(err)));
  }

  public updateVentaFisica(venta: VentaProducto): Observable<any> {
    return this.http
      .put<VentaView>(`${this.API_URL}/api/venta/fisica/${venta.uuid}`, venta)
      .pipe(catchError((err) => this.handdleError(err)));
  }

  public updateEstadoVenta(uuid: string, venta: VentaView): Observable<any> {
    return this.http
      .put<VentaView>(`${this.API_URL}/api/venta/estado/${uuid}`, venta)
      .pipe(catchError((err) => this.handdleError(err)));
  }

  public deleteVenta(uuid: string): Observable<any> {
    return this.http
      .delete<VentaView>(`${this.API_URL}/api/venta/${uuid}`)
      .pipe(catchError((err) => this.handdleError(err)));
  }

  public addVentaOnline(venta: VentaProducto): Observable<any> {
    return this.http
      .post<PedidoProducto>(`${this.API_URL}/api/venta/online`, venta)
      .pipe(catchError((err) => this.handdleError(err)));
  }

  public paypal(venta: VentaProducto): Observable<any> {
    return this.http
      .post<any>(`${this.API_URL}/api/paypal/create-order`, venta)
      .pipe(catchError((error) => this.handdleError(error)));
  }

  public paypalPedido(venta: VentaProducto): Observable<any> {
    return this.http
      .post<any>(`${this.API_URL}/api/paypal/create-order`, venta)
      .pipe(catchError((error) => this.handdleError(error)));
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
      timeOut: 8000,
      enableHtml: true,
    });
    return throwError(httpError);
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { ToastrService } from 'ngx-toastr';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CarritoProductoView } from '@models/liraki/carrito.producto.interface';
import { CarritoProducto } from '@models/liraki/carrito.producto.interface';

@Injectable({
  providedIn: 'root',
})
export class CarritoProyectoService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient, private toastrSvc: ToastrService) {}

  public getOneCarritoProducto(uuid: string): Observable<CarritoProductoView> {
    return this.http
      .get<CarritoProductoView>(`${this.API_URL}/api/carrito/${uuid}`)
      .pipe(catchError((error) => this.handdleError(error)));
  }

  public updateCarritoProducto(
    uuid: string,
    carritoproducto: CarritoProducto
  ): Observable<any> {
    return this.http
      .put(`${this.API_URL}/api/carrito/${uuid}`, carritoproducto)
      .pipe(catchError((error) => this.handdleError(error)));
  }

  public deleteCarritoProducto(uuid: string): Observable<any> {
    return this.http
      .delete(`${this.API_URL}/api/carrito/${uuid}`)
      .pipe(catchError((error) => this.handdleError(error)));
  }
  // ====================> handdleError
  public handdleError(httpError: HttpErrorResponse | any): Observable<never> {
    let errorMessage = '';
    if (httpError.error.message) {
      if (httpError.error.message.errno) {
        errorMessage = httpError.error.message.errno;
        this.toastrSvc.error(errorMessage, 'Ocurrio un Error!', {
          timeOut: 7000,
          enableHtml: true,
        });
      }
    }
    console.log('this error', httpError);

    return throwError(httpError);
  }
}

import { CarritoProducto } from '@app/shared/models/liraki/carrito.producto.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { ToastrService } from 'ngx-toastr';

import { Observable, throwError, Subject, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CarritoProductoView } from '@models/liraki/carrito.producto.interface';

@Injectable({
  providedIn: 'root',
})
export class CarritoProyectoService {
  private API_URL = environment.API_URL;
  private carrito: BehaviorSubject<CarritoProductoView[] | null> =
    new BehaviorSubject<CarritoProductoView[] | null>(null);
  private totalCart: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public carrito$: Observable<CarritoProductoView[] | null> =
    this.carrito.asObservable();
  public totalCart$: Observable<number> = this.totalCart.asObservable();

  constructor(private http: HttpClient, private toastrSvc: ToastrService) {}

  public addCarritoProducto(
    carritoProducto: CarritoProducto
  ): Observable<CarritoProducto> {
    return this.http
      .post<CarritoProducto>(`${this.API_URL}/api/carrito`, carritoProducto)
      .pipe(catchError((error) => this.handdleError(error)));
  }

  public getOneCarritoProducto(
    uuid: string
  ): Observable<CarritoProductoView[]> {
    return this.http
      .get<CarritoProductoView[]>(`${this.API_URL}/api/carrito/${uuid}`)
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

  public deleteProductoFromCarrito(uuid: string): Observable<any> {
    return this.http
      .delete(`${this.API_URL}/api/carrito/producto/${uuid}`)
      .pipe(catchError((error) => this.handdleError(error)));
  }

  public addCarritoStore(CarritoProducto: CarritoProductoView[] | null): void {
    let total: number = 0;
    if (CarritoProducto !== null) {
      CarritoProducto.forEach((carrito) => (total += carrito.cantidad));
    }
    this.carrito.next(CarritoProducto);
    this.totalCart.next(total);
  }
  // ====================> handdleError
  public handdleError(
    httpError: HttpErrorResponse | any
  ): Observable<never | null> {
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

    return of(null);

    return throwError(httpError);
  }
}

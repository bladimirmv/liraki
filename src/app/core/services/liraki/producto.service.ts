import { CategoriaProducto } from '@app/shared/models/liraki/categoria.producto.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { ProductoView } from '@models/liraki/producto.interface';
import { catchError, map } from 'rxjs/operators';
import {
  OpinionProducto,
  OpinionProductoView,
} from '@app/shared/models/liraki/opinion.producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient, private toastrSvc: ToastrService) {}

  public getAllProductos(): Observable<ProductoView[]> {
    return this.http.get<ProductoView[]>(`${this.API_URL}/api/producto`).pipe(
      map((productoView: ProductoView[]) =>
        productoView.filter((producto) => producto.estado)
      ),
      catchError((error) => this.handdleError(error))
    );
  }

  public getOneProducto(uuid: string): Observable<ProductoView> {
    return this.http
      .get<ProductoView>(`${this.API_URL}/api/producto/${uuid}`)
      .pipe(catchError((error) => this.handdleError(error)));
  }

  public addOpinion(opinion: OpinionProducto): Observable<OpinionProducto> {
    return this.http
      .post<OpinionProducto>(`${this.API_URL}/api/opinionProducto`, opinion)
      .pipe(catchError((error) => this.handdleError(error)));
  }

  public getAllOpinionByUuid(uuid: string): Observable<OpinionProductoView[]> {
    return this.http
      .get<OpinionProductoView[]>(`${this.API_URL}/api/opinionProducto/${uuid}`)
      .pipe(catchError((error) => this.handdleError(error)));
  }

  public paypal(): Observable<any> {
    return this.http
      .post<any>(`${this.API_URL}/api/paypal/create-order`, {})
      .pipe(catchError((error) => this.handdleError(error)));
  }

  public ratingProducto(opiniones: OpinionProducto[]): number[] {
    const stars: Array<number> = [0, 0, 0, 0, 0];
    const rate: number = 0;

    opiniones.forEach((opinion: OpinionProducto, index: number) => {
      stars[opinion.puntuacion - 1]++;
    });

    stars.forEach((n: number, index: number) => {
      stars[index] = Number(((n * 100) / opiniones.length).toFixed(1));
    });

    stars.forEach((n: number, index: number) => {
      // rate += (n * 100) / opiniones.length
    });

    return stars;
  }

  getProductosByPage(pageNum: number): any {
    return this.http
      .get<ProductoView[]>(
        `${this.API_URL}/api/producto/page/${String(pageNum)}`
      )
      .pipe(
        map((productoView: ProductoView[]) =>
          productoView.filter((producto) => producto.estado)
        ),
        catchError((error) => this.handdleError(error))
      );
  }

  public getAllCategoriaProducto(): Observable<CategoriaProducto[]> {
    return this.http
      .get<CategoriaProducto[]>(`${this.API_URL}/api/categoriaProducto/`)
      .pipe(catchError((error) => this.handdleError(error)));
  }

  // ====================> handdleError
  public handdleError(httpError: HttpErrorResponse | any): Observable<never> {
    let errorMessage = '';
    if (httpError.error.message) {
      if (typeof httpError.error.message === 'string')
        errorMessage = `${httpError.error.message}`;
      if (httpError.error.message.errno) {
        switch (httpError.error.message.errno) {
          case 1451:
            errorMessage =
              'No se puede eliminar por que este producto esta relacionado con uno o mas tablas. 🙁';
            this.toastrSvc.error(errorMessage, 'Ocurrio un Error!', {
              timeOut: 7000,
              enableHtml: true,
            });

            break;
          case 1062:
            errorMessage =
              'Ya existe un producto con ese mismo nombre, porfavor igrese uno nuevo en su lugar. 🙁';
            this.toastrSvc.error(errorMessage, 'Ocurrio un Error!', {
              timeOut: 7000,
              enableHtml: true,
            });
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

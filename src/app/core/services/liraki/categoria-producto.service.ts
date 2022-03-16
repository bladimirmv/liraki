import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, ObservableLike, throwError } from 'rxjs';
import { ProductoView } from '@models/liraki/producto.interface';
import { catchError, map } from 'rxjs/operators';
import { OpinionProducto } from '@app/shared/models/liraki/opinion.producto.interface';
import { CategoriaProducto } from '@app/shared/models/liraki/categoria.producto.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriaProductoService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient, private toastrSvc: ToastrService) {}

  public getAllCategoriaProducto(): Observable<CategoriaProducto[]> {
    return this.http
      .get<CategoriaProducto[]>(`${this.API_URL}/api/categoriaProducto`)
      .pipe(catchError((error) => this.handdleError(error)));
  }

  public getAllCategoriaProductoByPage(
    page: number
  ): Observable<CategoriaProducto[]> {
    return this.http
      .get<CategoriaProducto[]>(
        `${this.API_URL}/api/categoriaProducto/page/${page}`
      )
      .pipe(catchError((error) => this.handdleError(error)));
  }

  // ====================> handdleError
  public handdleError(httpError: HttpErrorResponse | any): Observable<never> {
    let errorMessage = '';
    if (httpError.error.message) {
      if (httpError.error.message.errno) {
      }
    }
    console.log('this error', httpError);

    return throwError(httpError);
  }
}

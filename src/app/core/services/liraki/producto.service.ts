import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { ProductoView } from '@models/liraki/producto.interface'
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient, private toastrSvc: ToastrService) { }

  public getAllProductos(): Observable<ProductoView[]> {
    return this.http
      .get<ProductoView[]>(`${this.API_URL}/api/producto`)
      .pipe(
        map((productoView: ProductoView[]) => productoView.filter(producto => producto.estado)),
        catchError(error => this.handdleError(error)));
  }


  // ====================> handdleError
  public handdleError(httpError: HttpErrorResponse | any): Observable<never> {
    let errorMessage = '';
    if (httpError.error.message) {
      if (typeof httpError.error.message === 'string') {
        errorMessage = `${httpError.error.message}`;
      } else if (httpError.error.message.errno) {
        switch (httpError.error.message.errno) {
          case 1451:
            errorMessage = 'No se puede eliminar por que este producto esta relacionado con uno o mas tablas. 🙁';
            break;
          case 1062:
            errorMessage = 'Ya existe un producto con ese mismo nombre, porfavor igrese uno nuevo en su lugar. 🙁';
            break;
          default:
            errorMessage = `
            Error: ${httpError.statusText}</br>
            Status: ${httpError.status}`;
            break;
        }
      }
    }
    console.log('this error', httpError);
    this.toastrSvc.error(errorMessage, 'Ocurrio un Error!', {
      timeOut: 7000,
      enableHtml: true
    });
    return throwError(httpError);
  }
}

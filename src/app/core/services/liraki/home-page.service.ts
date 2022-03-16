import { ProductoCard } from './../../../shared/models/liraki/home.page.interface';
import { HomePage } from '@models/liraki/home.page.interface';
import { CategoriaProducto } from './../../../shared/models/liraki/categoria.producto.interface';
import { Producto } from './../../../shared/models/liraki/producto.interface';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  private API_URL = environment.API_URL;

  constructor(private htpp: HttpClient, private toastrSvc: ToastrService) {}

  public getHomePage(): Observable<HomePage> {
    return this.htpp
      .get<HomePage>(`${this.API_URL}/api/homePage`)
      .pipe(catchError((err) => this.handdleError(err)));
  }
  public getRecienAgregados(): Observable<ProductoCard[]> {
    return this.htpp
      .get<ProductoCard[]>(`${this.API_URL}/api/homePage/recienAgregados`)
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

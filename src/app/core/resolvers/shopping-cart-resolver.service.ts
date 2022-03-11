import { Usuario } from './../../shared/models/auth/usuario.interface';
import { CarritoProductoView } from '@models/liraki/carrito.producto.interface';
import { AuthService } from '@services/auth/auth.service';
import { CarritoProyectoService } from '@services/liraki/carrito-proyecto.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take, mergeMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartResolverService
  implements Resolve<CarritoProductoView[] | null>
{
  constructor(
    private carritoSvc: CarritoProyectoService,
    private authSvc: AuthService
  ) {}

  resolve(): Observable<CarritoProductoView[] | null> {
    return this.authSvc.usuario$.pipe(
      take(1),
      mergeMap((usr) =>
        usr
          ? this.carritoSvc.getOneCarritoProducto(usr.uuid).pipe(take(1))
          : of(null)
      ),
      tap((carrito) =>
        carrito
          ? this.carritoSvc.addCarritoStore(carrito.length ? carrito : null)
          : null
      )
    );

    // ! ==========================================
    // return new Observable((obs) => {
    //   this.authSvc.usuario$
    //     .pipe(
    //       take(1),
    //       mergeMap((usr) => {
    //         if (!usr) {
    //           obs.next(null);
    //           obs.complete();
    //           return;
    //         }
    //         return this.carritoSvc
    //           .getOneCarritoProducto(usr.uuid)
    //           .pipe(take(1));
    //       })
    //     )
    //     .subscribe((carrito) => {
    //       if (!carrito) {
    //         obs.next(null);
    //         obs.complete();
    //         return;
    //       }
    //       this.carritoSvc.addCarritoStore(carrito.length ? carrito : null);
    //       obs.next(carrito.length ? carrito : null);
    //       obs.complete();
    //     });
    // });

    // ! ==========================================
    // return new Observable((obs) => {
    //   this.authSvc.usuario$.pipe(take(1)).subscribe((usr) => {
    //     if (!usr) {
    //       console.log(usr);
    //       obs.next(null);
    //       obs.complete();
    //       return null;
    //     }
    //     this.carritoSvc
    //       .getOneCarritoProducto(usr.uuid)
    //       .pipe(take(1))
    //       .subscribe((carrito) => {
    //         this.carritoSvc.addCarritoStore(carrito.length ? carrito : null);
    //         obs.next(carrito.length ? carrito : null);
    //         obs.complete();
    //       });
    //   });
    // });
  }
}

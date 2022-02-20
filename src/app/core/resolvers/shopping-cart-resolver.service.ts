import { CarritoProductoView } from './../../shared/models/liraki/carrito.proyecto.interface';
import { AuthService } from '@services/auth/auth.service';
import { CarritoProyectoService } from './../services/liraki/carrito-proyecto.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartResolverService implements Resolve<any> {
  constructor(
    private carritoSvc: CarritoProyectoService,
    private authSvc: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authSvc.usuario$.pipe(take(1)).subscribe((usr) => {
      //   if (usr) {
      //     return this.carritoSvc.getOneCarritoProducto(usr.uuid);
      //   }

      return this.carritoSvc.getOneCarritoProducto(usr ? usr.uuid : '');
    });
  }
}

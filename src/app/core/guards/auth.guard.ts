import { Usuario } from '@app/shared/models/auth/usuario.interface';
import { map, take } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}

  canActivate(): Observable<boolean> | boolean {
    console.log('check token');

    this.authSvc.checkToken();
    return true;
  }
}

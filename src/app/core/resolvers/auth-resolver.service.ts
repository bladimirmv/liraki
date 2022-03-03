import { take, tap } from 'rxjs/operators';
import { AuthService } from './../services/auth/auth.service';
import { Usuario } from './../../shared/models/auth/usuario.interface';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthResolverService implements Resolve<Usuario | null> {
  constructor(private authSvc: AuthService) {}

  resolve(): Observable<Usuario | null> {
    return this.authSvc.usuario$.pipe(take(1));
  }
}

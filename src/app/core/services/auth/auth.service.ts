import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { RoleValidator } from '@core/helpers/roleValidator';
import { Usuario } from '@app/shared/models/usuario.interface';
import { UsuarioResponse } from '@shared/models/usuario.interface';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService extends RoleValidator {
  private API_URL = environment.API_URL;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private usuario = new BehaviorSubject<Usuario>(null);
  public usuario$: Observable<Usuario> = this.usuario.asObservable();
  private usuarioToken = new BehaviorSubject<string>(null);
  // ====================================================================
  constructor(private http: HttpClient, private toastrSvc: ToastrService, private router: Router) {
    super();
    this.checkToken();
  }
  // ====================================================================
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get userTokenValue(): string {
    return this.usuarioToken.getValue();
  }
  // ====================================================================
  public login(authData: Usuario): Observable<UsuarioResponse | void> {
    return this.http.post<UsuarioResponse>(`${this.API_URL}/api/auth/login`, authData)
      .pipe(
        map((usuario: UsuarioResponse) => {
          this.usuario.next(usuario.body);
          this.saveToken(usuario.token);
          this.loggedIn.next(true);
          this.usuarioToken.next(usuario.token);
          return usuario;
        }),
        catchError((err) => this.handdleError(err))
      );

  }
  // ====================================================================
  public registerUsuario(usuario: Usuario): Observable<UsuarioResponse> {
    return this.http
      .post<UsuarioResponse>(`${this.API_URL}/api/usuario/register`, usuario)
      .pipe(
        map((usuario: UsuarioResponse) => {
          this.usuario.next(usuario.body);
          this.saveToken(usuario.token);
          this.loggedIn.next(true);
          this.usuarioToken.next(usuario.token);
          return usuario;
        }),
        catchError(error => this.handdleError(error)));
  }
  // ====================================================================
  public logout(): void {
    localStorage.removeItem('token-liraki');
    this.loggedIn.next(false);
    this.usuario.next(null);
    this.usuarioToken.next(null);
    this.router.navigate(['/']);
  }
  // ====================================================================
  public checkToken(): any {
    const usuarioToken = localStorage.getItem('token-liraki') || null;
    if (usuarioToken) {
      const isExpired = helper.isTokenExpired(usuarioToken);
      const { iat, exp, ...usuarioJwt } = helper.decodeToken(usuarioToken);

      if (isExpired) {
        this.logout();
        this.toastrSvc.warning('La sesion ha expirado, porfavor inicia sesion nuevamente', 'Sesion Expirada!', {
          timeOut: 7000
        });
      } else {
        this.loggedIn.next(true);
        this.usuarioToken.next(usuarioToken);
        this.usuario.next(usuarioJwt);
      }
    }
  }
  // ====================================================================
  public saveToken(token: string): void {
    localStorage.setItem('token-liraki', token);
  }
  // ====================================================================
  public roleNavigate(usuario: Usuario): void {
    this.router.navigate(['/home']);
    this.toastrSvc.info(usuario.nombre, 'Bienvenido! 👋');
  }
  // ====================================================================
  private handdleError(httpError: HttpErrorResponse | any): Observable<never> {
    let errorMessage = '';

    if (httpError.error.message) {
      if (typeof httpError.error.message === 'string') {
        errorMessage = `${httpError.error.message}`;
      } else if (httpError.error.message.errno) {
        switch (httpError.error.message.errno) {
          case -111:
            errorMessage = 'No se ha podido establecer una conexion con la base de datos. 🙁';
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
      enableHtml: true
    });
    return throwError(httpError);
  }
  // ====================================================================

}

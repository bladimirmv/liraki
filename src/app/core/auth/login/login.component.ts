import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();
  hide = true;
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('blado959', Validators.required),
    contrasenha: new FormControl('bmvmendo123', Validators.required)
  });

  public registerForm: FormGroup = new FormGroup({
    docid: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    // private authSvc: AuthService,
    private toastrSvc: ToastrService,
  ) {
  }


  ngOnInit(): void {
    this.checkUserStatus();
  }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public onLogIn(usr: any): void {

    // this.authSvc.login(usr)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((res: UsuarioResponse) => {
    //     if (res) {
    //       this.authSvc.roleNavigate(res.body);
    //     }
    //   })


    this.router.navigate(['/home'])
  }


  private checkUserStatus(): void {
    // this.authSvc.usuario$
    //   .subscribe((usuario: Usuario) => {
    //     if (usuario) {
    //       this.authSvc.roleNavigate(usuario);
    //     }
    //   });
  }



}

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { UsuarioService } from '@services/auth/usuario.service';

import { UsuarioResponse } from '@app/shared/models/auth/usuario.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public year: number = new Date().getUTCFullYear();
  private destroy$: Subject<any> = new Subject<any>();
  hide = true;

  public registerForm: FormGroup;

  // public registerForm: FormGroup = new FormGroup({
  //   username: new FormControl('blado959', Validators.required),
  //   contrasenha: new FormControl('bmvmendo123', Validators.required)
  // });

  // public registerForm: FormGroup = new FormGroup({
  //   docid: new FormControl('', Validators.required)
  // });

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private toastrSvc: ToastrService,
    private usuarioSvc: UsuarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public onRegister(usr: any): void {
    this.authSvc
      .registerUsuario(usr)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: UsuarioResponse) => {
        if (res) {
          this.authSvc.roleNavigate(res.body);
        }
      });
  }

  // ============> onInitForm
  private initForm(): void {
    this.registerForm = this.fb.group({
      nombre: [
        'bladimir',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/^[a-z\s]+$/),
        ],
      ],
      apellidoPaterno: [
        'medrano',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(/^[a-z\s]+$/),
        ],
      ],
      apellidoMaterno: [
        'vargas',
        [Validators.maxLength(50), Validators.pattern(/^[a-z\s]+$/)],
      ],
      celular: [0],
      direccion: [''],
      correo: [
        'bladimir@gmail.com',
        [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)],
      ],
      rol: ['cliente', [Validators.required]],
      username: [
        'blado959',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ],
      ],
      contrasenha: [
        'bmv45645',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      autoUsuario: [false],
      autoContrasenha: [false],
      activo: [true, [Validators.required]],
    });
  }

  // ===========> isValidField
  public isValidField(field: string): {
    color?: string;
    status?: boolean;
    icon?: string;
  } {
    const validateFIeld = this.registerForm.get(field);
    return !validateFIeld.valid && validateFIeld.touched
      ? { color: 'warn', status: false, icon: 'close' }
      : validateFIeld.valid
      ? { color: 'accent', status: true, icon: 'done' }
      : {};
  }
}

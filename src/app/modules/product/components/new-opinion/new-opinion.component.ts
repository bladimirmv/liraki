import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto, ProductoView } from '@app/shared/models/liraki/producto.interface';
import { Subject } from 'rxjs';
import { OpinionProducto } from '@app/shared/models/liraki/opinion.producto.interface';
import { AuthService } from '@app/core/services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Usuario } from '@app/shared/models/usuario.interface';
import { ProductoService } from '@app/core/services/liraki/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-opinion',
  templateUrl: './new-opinion.component.html',
  styleUrls: ['./new-opinion.component.scss']
})
export class NewOpinionComponent implements OnInit, OnDestroy {

  private destroy$: Subject<any> = new Subject<any>();



  public stars: Array<boolean> = [true, true, true, true, true];
  private uuidCliente: string = '';
  public opinionForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public producto: ProductoView,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private productoSvc: ProductoService,
    private toastrSvc: ToastrService,
    private dialogRef: MatDialogRef<NewOpinionComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUserComment();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public initForm(): void {
    this.opinionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
      puntuacion: [this.getPuntuacion(), [Validators.required, Validators.pattern(/^[1-5]$/)]],
      uuidProducto: [this.producto.uuid],
      uuidCliente: [this.uuidCliente]
    });
  }

  private getUserComment(): void {
    this.authSvc
      .usuario$
      .pipe(takeUntil(this.destroy$))
      .subscribe((usuario: Usuario) => {
        this.uuidCliente = usuario.uuid
        this.initForm();
      });
  }
  // ===========> isValidField
  public isValidField(field: string): { color?: string; status?: boolean; icon?: string; } {
    const validateFIeld = this.opinionForm.get(field);
    return (!validateFIeld.valid && validateFIeld.touched)
      ? { color: 'warn', status: false, icon: 'close' }
      : validateFIeld.valid
        ? { color: 'accent', status: true, icon: 'done' }
        : {};
  }


  public starButton(starNumber: number): void {
    this.stars = [false, false, false, false, false];

    for (let index = 0; index < starNumber; index++) {
      this.stars[index] = true;
    }
  }

  private getPuntuacion(): number {
    let count: number = 0;
    this.stars.forEach((star: boolean) => {
      star ? count++ : null;
    });
    return count;
  }

  public newOpinion(opinion: OpinionProducto): void {
    opinion.puntuacion = this.getPuntuacion();
    this.productoSvc
      .addOpinion(opinion)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.toastrSvc.success('El opinion se ha creado correctamente, por favor espere su confirmacion del mismo. 😀 ', 'Opinion Creado!', {
          timeOut: 7000
        });
        this.dialogRef.close(true);
      });
  }
}

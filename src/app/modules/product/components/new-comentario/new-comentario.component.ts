import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto, ProductoView } from '@app/shared/models/liraki/producto.interface';
import { Subject } from 'rxjs';
import { ComentarioProducto } from '@models/liraki/comentario.producto.interface';

@Component({
  selector: 'app-new-comentario',
  templateUrl: './new-comentario.component.html',
  styleUrls: ['./new-comentario.component.scss']
})
export class NewComentarioComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();

  public stars: Array<boolean> = [true, true, true, true, true];

  public comentarioForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public producto: ProductoView,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public initForm(): void {
    this.comentarioForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
      puntuacion: [this.getPuntuacion(), [Validators.required, Validators.pattern(/^[1-5]$/)]],
      uuidProducto: [this.producto.uuid],
      uuidCliente: ['']
    });
  }

  // ===========> isValidField
  public isValidField(field: string): { color?: string; status?: boolean; icon?: string; } {
    const validateFIeld = this.comentarioForm.get(field);
    return (!validateFIeld.valid && validateFIeld.touched)
      ? { color: 'warn', status: false, icon: 'close' }
      : validateFIeld.valid
        ? { color: 'accent', status: true, icon: 'done' }
        : {};
  }


  /**
   * starButton
   */
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

  public newComentario(comentario: ComentarioProducto): void {
    comentario.puntuacion = this.getPuntuacion();
    console.log(comentario);

  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-pedido',
  template: `
    <mat-dialog-content align="center">
      <mat-icon> shopping_cart </mat-icon>
      <h1 align="center" style="font-weight: bold">title</h1>
      <h2>descripcion</h2>
    </mat-dialog-content>

    <mat-dialog-actions mat-dialog-actions align="center">
      <button
        mat-button
        [mat-dialog-close]="false"
        class="mat-btn-secondary"
        mat-dialog-close
      >
        Cancelar
      </button>
      <button mat-button [mat-dialog-close]="true" class="mat-btn-success">
        Continuar
      </button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./warning-pedido.component.scss'],
})
export class WarningPedidoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

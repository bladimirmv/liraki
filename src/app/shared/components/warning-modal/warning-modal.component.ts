import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface warningDialog {
  title: string;
  paragraph: string;
  btnPrimary: string;
  color: string;
  icon: string;
  navigate?: boolean;
  routerLink?: string;
}

@Component({
  selector: 'app-warning-modal',
  template: `
    <mat-dialog-content align="center" [class]="dataDialog.color">
      <mat-icon>{{ dataDialog.icon }}</mat-icon>
      <h1 align="center" class="gradient-tex h-titl">
        {{ dataDialog.title }}
      </h1>
      <h3>{{ dataDialog.paragraph }}</h3>
    </mat-dialog-content>

    <mat-dialog-actions mat-dialog-actions align="center">
      <button
        mat-button
        [mat-dialog-close]="false"
        class="mat-btn-secondary full-width"
        mat-dialog-close
      >
        Cancelar
      </button>

      <button
        mat-button
        [mat-dialog-close]="true"
        class="mat-btn-success full-width"
        *ngIf="!dataDialog.navigate; else navigate"
      >
        {{ dataDialog.btnPrimary }}
      </button>

      <ng-template #navigate>
        <button
          mat-button
          [mat-dialog-close]="true"
          class="mat-btn-success full-width"
          [routerLink]="dataDialog.routerLink"
        >
          {{ dataDialog.btnPrimary }}
        </button>
      </ng-template>
    </mat-dialog-actions>
  `,
  styleUrls: ['./warning-modal.component.scss'],
})
export class WarningModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: warningDialog) {}

  ngOnInit(): void {}
}

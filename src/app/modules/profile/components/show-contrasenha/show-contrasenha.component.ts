import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Usuario } from '@app/shared/models/auth/usuario.interface';

@Component({
  selector: 'app-show-contrasenha',
  templateUrl: './show-contrasenha.component.html',
  styleUrls: ['./show-contrasenha.component.scss'],
})
export class ShowContrasenhaComponent implements OnInit {
  public hidden = true;
  constructor(
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {}

  ngOnInit(): void {}
  openSnackBarCopy(): void {
    this.snackBar.open('Copiado', 'Cerrar', {
      duration: 500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  onChangeViewContrasenha(): void {
    this.hidden ? (this.hidden = false) : (this.hidden = true);
  }
}

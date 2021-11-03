import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.scss']
})
export class ImgPreviewComponent implements OnInit {
  public currentFoto: number = this.data.current || 0;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { fotos: string[]; current: number; }
  ) {
  }

  ngOnInit(): void {
  }


  onBack(): void {
    this.currentFoto--;
    if (this.currentFoto < 0) {
      this.currentFoto = this.data.fotos.length - 1;
    }
  }

  onForward(): void {
    this.currentFoto++;
    if (this.currentFoto > this.data.fotos.length - 1) this.currentFoto = 0;
  }

}

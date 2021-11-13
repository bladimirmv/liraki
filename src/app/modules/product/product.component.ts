import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '@app/core/services/liraki/producto.service';
import { FotoProducto, ProductoView } from '@app/shared/models/liraki/producto.interface';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImgPreviewComponent } from './components/img-preview/img-preview.component';
import { NewComentarioComponent } from './components/new-comentario/new-comentario.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  private destroy$: Subject<any> = new Subject<any>();
  private uuidProducto: string;
  public producto: ProductoView = { fotos: [] } as ProductoView;
  private fotos: FotoProducto[];
  private API_URL = environment.API_URL;
  public currentFoto: FotoProducto = {} as FotoProducto;


  constructor(
    private activateRoute: ActivatedRoute,
    private productoSvc: ProductoService,
    private dialog: MatDialog) {
    this.uuidProducto = this.activateRoute.snapshot.params.uuid;

  }

  ngOnInit(): void {
    this.getProducto();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public getDescuento(): string {
    let result: number = 0;
    this.producto.descuento > 100 || this.producto.descuento < 0
      ? result = 0
      : result = this.producto.precio -
      (this.producto.precio * this.producto.descuento) / 100;
    return result.toFixed(2);
  }


  private getProducto(): void {
    this.productoSvc
      .getOneProducto(this.uuidProducto)
      .pipe(takeUntil(this.destroy$))
      .subscribe((producto: ProductoView) => {
        this.currentFoto = producto.fotos[0];
        this.fotos = producto.fotos;
        this.producto = producto;
        this.producto.fotos = this.producto.fotos.filter((foto, index) => index !== 0);
      });
  }


  public getImage(keyName: string): string {
    return `${this.API_URL}/api/file/${keyName}`;
  }

  public alertStock(stock: number): string {
    return stock <= 3 && stock > 1
      ? `⏳ Solo quedan ${stock}!`
      : stock === 1
        ? `⏳ Solo queda uno!`
        : stock < 1
          ? `⛔ Agotado!`
          : `Disponible: ${stock}`
  }

  public modalPreview(e: Event, foto: FotoProducto): void {
    e.stopPropagation()
    const keyNames: Array<string> = this.fotos.map((foto: FotoProducto) => `${this.API_URL}/api/file/${foto.keyName}`);
    this.dialog.open(ImgPreviewComponent, {
      data: {
        fotos: keyNames,
        current: keyNames.indexOf(`${this.API_URL}/api/file/${foto.keyName}`)
      },
      panelClass: 'custom-dialog-container'
    });
  }
  public stockColor(stock: number): string {
    return stock > 3
      ? 'info-stock'
      : 'warn-stock'
  }

  public newComentario(): void {
    const dialogRef = this.dialog.open(NewComentarioComponent, {
      data: this.producto
    });


    // dialogRef.afterClosed()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((res) => {

    //   });

  }
}
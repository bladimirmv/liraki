import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '@app/core/services/liraki/producto.service';
import { OpinionProducto } from '@app/shared/models/liraki/opinion.producto.interface';
import { FotoProducto, ProductoView } from '@app/shared/models/liraki/producto.interface';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImgPreviewComponent } from './components/img-preview/img-preview.component';
import { NewOpinionComponent } from './components/new-opinion/new-opinion.component';

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
  public Opiniones: OpinionProducto[] = [];
  public stars: number[] = [0, 0, 0, 0, 0];

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
        this.getOpinion();
      });
  }

  private getOpinion(): void {
    this.productoSvc
      .getAllOpinion(this.producto.uuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((opiniones: OpinionProducto[]) => {
        this.Opiniones = opiniones;

        this.stars = this.productoSvc.ratingProducto(opiniones);
      })
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
    this.dialog.open(NewOpinionComponent, {
      data: this.producto
    });
  }
}

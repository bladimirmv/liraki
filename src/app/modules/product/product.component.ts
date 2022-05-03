import { ToastrService } from 'ngx-toastr';
import { Usuario } from '@app/shared/models/auth/usuario.interface';
import { WarningModalComponent } from './../../shared/components/warning-modal/warning-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '@app/core/services/liraki/producto.service';
import { OpinionProductoView } from '@app/shared/models/liraki/opinion.producto.interface';
import {
  FotoProducto,
  ProductoView,
} from '@app/shared/models/liraki/producto.interface';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImgPreviewComponent } from './components/img-preview/img-preview.component';
import { NewOpinionComponent } from './components/new-opinion/new-opinion.component';
import { CarritoProyectoService } from '@app/core/services/liraki/carrito-proyecto.service';

import * as moment from 'moment';
import { CarritoProducto } from '@app/shared/models/liraki/carrito.producto.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();
  private uuidProducto: string;
  public producto: ProductoView = { fotos: [] } as ProductoView;
  private fotos: FotoProducto[];
  private API_URL = environment.API_URL;
  public currentFoto: FotoProducto = {} as FotoProducto;
  public Opiniones: OpinionProductoView[] = [];
  public stars: number[] = [0, 0, 0, 0, 0];
  public usuario: Usuario;

  constructor(
    private activateRoute: ActivatedRoute,
    private productoSvc: ProductoService,
    private dialog: MatDialog,
    private carritoSvc: CarritoProyectoService,
    private toastrSvc: ToastrService
  ) {
    this.uuidProducto = this.activateRoute.snapshot.params.uuid;
  }

  ngOnInit(): void {
    this.usuario = this.activateRoute.snapshot.data['usuario'];
    moment.locale('es');
    this.getProducto();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public getRelativeTime(date: Date): string {
    return moment(date).fromNow();
  }

  public getDescuento(): string {
    let result: number = 0;
    this.producto.descuento > 100 || this.producto.descuento < 0
      ? (result = 0)
      : (result =
          this.producto.precio -
          (this.producto.precio * this.producto.descuento) / 100);
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
        this.producto.fotos = this.producto.fotos.filter(
          (foto, index) => index !== 0
        );
        this.getOpinion();
      });
  }

  private getOpinion(): void {
    this.productoSvc
      .getAllOpinionByUuid(this.producto.uuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((opiniones: OpinionProductoView[]) => {
        this.Opiniones = opiniones;

        if (opiniones.length) {
          this.stars = this.productoSvc.ratingProducto(opiniones);
        }
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
      : `Disponible`;
  }

  public modalPreview(e: Event, foto: FotoProducto): void {
    e.stopPropagation();
    const keyNames: Array<string> = this.fotos.map(
      (foto: FotoProducto) => `${this.API_URL}/api/file/${foto.keyName}`
    );
    this.dialog.open(ImgPreviewComponent, {
      data: {
        fotos: keyNames,
        current: keyNames.indexOf(`${this.API_URL}/api/file/${foto.keyName}`),
      },
      panelClass: 'custom-dialog-container',
    });
  }
  public stockColor(stock: number): string {
    return stock > 3 ? 'info-stock' : 'warn-stock';
  }

  public newComentario(): void {
    if (!this.usuario) {
      this.toastrSvc.info(
        `😀 Por favor <a href="/login" routerLink="/login">inicie sesión</a> para agregar una opinión.`,
        'No se ha Iniciado Sesión',
        {
          timeOut: 5000,
          enableHtml: true,
        }
      );
      return;
    }
    const dialoRef = this.dialog.open(NewOpinionComponent, {
      data: this.producto,
    });

    dialoRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => {
        if (res) {
          this.getOpinion();
        }
      });
  }

  public paypal(): void {
    this.productoSvc.paypal().subscribe((res: any) => {
      console.log(res.links[1].href);

      window.location.href = res.links[1].href;
    });
  }

  private getCarritoProducto(): void {
    this.carritoSvc
      .getOneCarritoProducto(this.usuario.uuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((carrito) => {
        this.carritoSvc.addCarritoStore(carrito.length ? carrito : null);
      });
  }

  public addCarritoProducto(): void {
    if (!this.producto.stock) {
      this.dialog.open(WarningModalComponent, {
        data: {
          title: 'Producto Agotado!',
          paragraph: 'No hay stock disponible para agregar al carrito.',
          btnPrimary: 'Ver Productos',
          color: 'warn',
          icon: 'production_quantity_limits',
          navigate: true,
          routerLink: '/products',
        },
      });
      return;
    }

    if (!this.usuario) {
      this.toastrSvc.info(
        `😀 Por favor <a href="/login" routerLink="/login">inicie sesión</a> para agregar un producto al carrito`,
        'No se ha Iniciado Sesión',
        {
          timeOut: 7000,
          enableHtml: true,
        }
      );
      return;
    }

    const carrito: CarritoProducto = {
      uuidCliente: this.usuario.uuid,
      uuidProducto: this.producto.uuid,
      cantidad: 1,
    };

    console.log(carrito);

    this.carritoSvc.addCarritoProducto(carrito).subscribe((res) => {
      if (res) {
        console.log('res', res);

        this.toastrSvc.success(
          '😀 El producto se ha agregado correctamente al carrito',
          'Producto Agregado'
        );
        this.getCarritoProducto();
      }
    });
  }
}

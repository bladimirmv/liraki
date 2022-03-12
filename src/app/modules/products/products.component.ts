import { Producto } from './../../shared/models/liraki/producto.interface';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { ProductoService } from '@services/liraki/producto.service';
import { concat, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type Precio =
  | 'menos_de_100bs'
  | '100bs_200bs'
  | '200bs_500bs'
  | '500bs_1000bs'
  | '1000bs_mas'
  | 'todos';

export interface FilterParams {
  order?: string;
  disponibilidad?: boolean | string;
  precio?: Precio;
  categoria?: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();
  public productos: ProductoView[] = [] as ProductoView[];
  public filteredProductos: ProductoView[] = [] as ProductoView[];

  public params: FilterParams = {} as FilterParams;
  private pageNum: number = 1;
  public showButton: boolean = false;

  constructor(
    private productoSvc: ProductoService,
    public route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollY = window.scrollY;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (scrollY || scrollTop) > 200;
  }

  ngOnInit(): void {
    this.getAllProducts();

    this.route.queryParams.subscribe((params: FilterParams) => {
      this.params = {
        disponibilidad: params.disponibilidad === 'true' ? true : false,
        precio: params.precio ? params.precio : 'todos',
        order: params.order ? params.order : 'recientemente_agregados',
      };

      this.filterProducts();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public filterProducts(): void {
    this.router.navigate(['/products'], {
      queryParams: {
        disponibilidad: this.params.disponibilidad,
        precio: this.params.precio,
        order: this.params.order,
      },
      queryParamsHandling: 'merge',
    });

    this.checkFilters();
  }

  public getPrecio(producto: Producto): number {
    return producto.precio - (producto.precio * producto.descuento) / 100;
  }

  private checkFilters(): void {
    this.filteredProductos = this.productos.filter((producto) =>
      this.params.disponibilidad ? producto.stock > 0 : producto
    );

    this.filteredProductos.sort((a, b) =>
      this.params.order === 'en_descuento'
        ? a.descuento > 0
          ? -1
          : 1
        : a.creadoEn > b.creadoEn
        ? -1
        : 1
    );

    switch (this.params.precio) {
      case 'menos_de_100bs':
        this.filteredProductos.sort((a, b) =>
          this.getPrecio(a) <= 100 ? -1 : 1
        );
        break;

      case '100bs_200bs':
        this.filteredProductos.sort((a, b) =>
          this.getPrecio(a) > 100 && this.getPrecio(a) <= 200 ? -1 : 1
        );
        break;

      case '200bs_500bs':
        this.filteredProductos.sort((a, b) =>
          this.getPrecio(a) > 200 && this.getPrecio(a) <= 500 ? -1 : 1
        );
        break;

      case '500bs_1000bs':
        this.filteredProductos.sort((a, b) =>
          this.getPrecio(a) > 100 && this.getPrecio(a) <= 1000 ? -1 : 1
        );
        break;

      case '1000bs_mas':
        this.filteredProductos.sort((a, b) =>
          this.getPrecio(a) >= 1000 ? -1 : 1
        );
        break;
      default:
        this.filteredProductos.sort((a, b) =>
          a.creadoEn > b.creadoEn ? -1 : 1
        );

        break;
    }
  }

  private getAllProducts(): void {
    this.productoSvc
      .getProductosByPage(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe((productoView: ProductoView[]) => {
        this.productos = productoView;
        this.filteredProductos = productoView;
        this.checkFilters();
      });
  }

  public onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  public onScrollDown(): void {
    this.pageNum++;
    this.productoSvc
      // .getProductosByPage(1)
      .getProductosByPage(this.pageNum)
      .pipe(takeUntil(this.destroy$))
      .subscribe((productoView: ProductoView[]) => {
        this.productos = this.productos.concat(productoView);
        this.filteredProductos = this.productos;
        this.checkFilters();
      });
  }
}

import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { ProductoService } from '@services/liraki/producto.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface FilterParams {
  order?: string;
  disponibilidad?: boolean | string;
  precio?: string;
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
  public params: FilterParams = {} as FilterParams;

  constructor(
    private productoSvc: ProductoService,
    public route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  private isVisible = true;

  ngOnInit(): void {
    this.getAllProducts();

    this.route.queryParams.subscribe((params: FilterParams) => {
      this.params = {
        disponibilidad: params.disponibilidad === 'true' ? true : false,
        precio: params.precio ? params.precio : 'todos',
        order: params.order ? params.order : 'todos',
      };
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
  }

  private getAllProducts(): void {
    this.productoSvc
      .getAllProductos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((productoView: ProductoView[]) => {
        this.productos = productoView;
      });
  }
}

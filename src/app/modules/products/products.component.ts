import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { environment } from '@env/environment';
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
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();
  public productos: ProductoView[] = [];
  params: FilterParams = {} as FilterParams;


  constructor(
    private productoSvc: ProductoService,
    private route: ActivatedRoute
  ) {

    this.route.queryParams
      .subscribe(params => {
        this.params = params;
      }
      );

  }


  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  private getAllProducts(): void {
    this.productoSvc
      .getAllProductos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((productoView: ProductoView[]) => {
        this.productos = productoView;
      });
  }

  isLinkActive(param: FilterParams): boolean {
    return this.params[Object.keys(param)[0]] === Object.values(param)[0]
      ? true
      : false;
  }


  getValueParam(): any {
    this.params.disponibilidad
  }









}

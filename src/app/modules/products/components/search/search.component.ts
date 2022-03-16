import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '@app/core/services/liraki/producto.service';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private destroy$: Subject<any> = new Subject<any>();

  public value: string = '';
  public productos: ProductoView[] = [];
  filteredProducts: ProductoView[];
  constructor(
    private activateRoute: ActivatedRoute,
    private productoSvc: ProductoService
  ) {
    this.value = this.activateRoute.snapshot.params.value;
  }

  ngOnInit(): void {
    this.getProducts();
    this.activateRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((parameter) => {
        this.value = parameter.value;
        this.filteredProducts = this._filter(this.value);
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  private getProducts(): void {
    this.productoSvc
      .getAllProductos()
      .subscribe((productos: ProductoView[]) => {
        this.productos = productos;
        this.filteredProducts = productos;
        this.filteredProducts = this._filter(this.value);
      });
  }
  private _filter(value: string): ProductoView[] {
    const filterValue = this._normalizeValue(value);

    return this.productos.filter(
      (product: ProductoView) =>
        this._normalizeValue(product.nombre).includes(filterValue) ||
        product.categorias
          .map((cat) => this._normalizeValue(cat.nombre))
          .includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}

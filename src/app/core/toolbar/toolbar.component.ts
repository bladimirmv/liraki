import { map, shareReplay, startWith, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { ProductoService } from '../services/liraki/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public modeSidenav = 'side';
  public breakpoint: boolean;
  private destroy$: Subject<any> = new Subject<any>();





  public control = new FormControl();
  public productos: ProductoView[] = [];
  filteredProducts: ProductoView[];

  constructor(private breakpointObserver: BreakpointObserver,
    private productoSvc: ProductoService,
    private router: Router) { }
  ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 700px)')
      .pipe(
        takeUntil(this.destroy$),
        map(res => res.matches),
        shareReplay()
      ).subscribe(res => this.breakpoint = res);

    this.getProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  private getProducts(): void {
    this.productoSvc
      .getAllProductos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((productos: ProductoView[]) => {
        this.productos = productos;
        this.filteredProducts = productos;
      });
  }



  public onKey(value): void {
    this.filteredProducts = this._filter(value);
    if (value === '')
      this.router.navigate(['/products']);
  }


  public search(value: string): void {
    this.router.navigate(['/search/', value]);
  }

  private _filter(value: string): ProductoView[] {
    const filterValue = this._normalizeValue(value);
    return this.productos.filter((product: ProductoView) => this._normalizeValue(product.nombre).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}

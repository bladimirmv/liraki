import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { environment } from '@env/environment';
import { ProductoService } from '@services/liraki/producto.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();
  public productos: ProductoView[] = [];


  constructor(
    private productoSvc: ProductoService,
  ) {

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




}

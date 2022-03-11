import { Usuario } from '@shared/models/auth/usuario.interface';
import { map, shareReplay, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { ProductoService } from '@services/liraki/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '@services/loader.service';
import { AuthService } from '@services/auth/auth.service';
import { CarritoProyectoService } from '@services/liraki/carrito-proyecto.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public modeSidenav = 'side';
  public breakpoint: boolean;
  public hideSearch: boolean = false;
  public control = new FormControl();
  public productos: ProductoView[] = [];
  public filteredProducts: ProductoView[];
  public totalCart: number;
  public usuario: Usuario;

  private destroy$: Subject<any> = new Subject<any>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private productoSvc: ProductoService,
    private router: Router,
    private carritoSvc: CarritoProyectoService,
    public loader: LoaderService,
    private activateRoute: ActivatedRoute,
    public authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.activateRoute.snapshot.data['usuario'];

    this.breakpointObserver
      .observe('(max-width: 540px)')
      .pipe(
        takeUntil(this.destroy$),
        map((res) => res.matches),
        shareReplay()
      )
      .subscribe((res: boolean) => {
        this.breakpoint = res;
        if (res === false) {
          this.hideSearch = false;
        }
      });

    this.getProducts();

    this.carritoSvc.totalCart$
      .pipe(takeUntil(this.destroy$))
      .subscribe((total: number) => {
        this.totalCart = total;
      });
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
    if (value === '') this.router.navigate(['/products']);
  }

  public search(value: string): void {
    this.router.navigate(['/search/', value]);
  }

  private _filter(value: string): ProductoView[] {
    const filterValue = this._normalizeValue(value);
    return this.productos.filter((product: ProductoView) =>
      this._normalizeValue(product.nombre).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  // !important for sidenav

  public openSideNav(): void {
    const sideNav: HTMLElement = document.querySelector('#sideNav');
    const main: HTMLElement = document.querySelector('#main-shadow');
    main.style.width = '100%';
    sideNav.style.width = '250px';
  }

  public closeSideNav(): void {
    const sideNav: HTMLElement = document.querySelector('#sideNav');
    const main: HTMLElement = document.querySelector('#main-shadow');
    main.style.width = '0';
    sideNav.style.width = '0';
  }
}

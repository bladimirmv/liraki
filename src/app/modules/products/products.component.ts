// import { Direction } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostBinding,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/core/services/loader.service';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { environment } from '@env/environment';
import { ProductoService } from '@services/liraki/producto.service';
import { fromEvent, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  takeUntil,
  throttleTime,
} from 'rxjs/operators';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden',
}

enum Direction {
  Up = 'Up',
  Down = 'Down',
}

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
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$: Subject<any> = new Subject<any>();
  public productos: ProductoView[] = [] as ProductoView[];
  params: FilterParams = {} as FilterParams;

  constructor(
    private productoSvc: ProductoService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });
  }

  // @HostListener('window:wheel')
  // onWindowScroll(): void {
  //   const yOffset = window.pageYOffset;
  //   const scrollTop = this.document.documentElement.scrollTop;

  //   console.log(yOffset);
  // }

  private isVisible = true;

  ngAfterViewInit() {
    const content = this.document.querySelector('.mat-sidenav-content');
    const scroll$ = fromEvent(content, 'scroll').pipe(
      // throttleTime(10),
      map(() => (content.scrollTop ? true : false))
      // pairwise(),
      // map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      // distinctUntilChanged(),
      // share()
    );

    // const scrollUp$ = scroll$.pipe(
    //   filter((direction) => direction === Direction.Up)
    // );

    // scroll$.subscribe((res) => {
    //   console.log(res);
    // });

    const scrollDown = scroll$
      .pipe
      // filter((direction) => direction === Direction.Down)
      ();

    // scrollUp$.subscribe(() => {
    //   console.log('up');
    // });
    // scrollDown.subscribe(() => {
    //   console.log('down');
    // });
  }

  // onScrollDown(eventData) {
  //   this.items.push(eventData.currentScrollPosition);
  // }

  onScrollDown() {
    console.log('bajo xd');
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
    this.params.disponibilidad;
  }
}

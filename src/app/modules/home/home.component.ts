import { ProductoCard } from './../../shared/models/liraki/home.page.interface';
import { Producto } from './../../shared/models/liraki/producto.interface';
import { HomePageService } from '@services/liraki/home-page.service';
import { environment } from '@env/environment';
import { CategoriaProducto } from '@app/shared/models/liraki/categoria.producto.interface';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductoService } from '@app/core/services/liraki/producto.service';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import Swiper from 'swiper';
import { HomePage } from '@app/shared/models/liraki/home.page.interface';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  private API_URL = environment.API_URL;

  public homePage: HomePage = {} as HomePage;
  public mainCategorias: Array<CategoriaProducto>;
  public finalCategorias: Array<CategoriaProducto>;
  public enDescuento: ProductoCard[];
  public recienAgregados: ProductoCard[];

  config: SwiperConfigInterface = {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },

    direction: 'horizontal',
    keyboard: true,
    scrollbar: false,
    navigation: {
      nextEl: '.sp-btn-next',
      prevEl: '.sp-btn-prev',
    },
    pagination: false,
    autoplay: {
      delay: 3500,
    },
    loop: true,
  };

  constructor(private homePageSvc: HomePageService) {}

  onIndexChange(e): void {}

  ngOnInit(): void {
    this.homePageSvc.getHomePage().subscribe((home: HomePage) => {
      this.homePage = home;
      this.mainCategorias = home.card_categorias[0].categoria;
      this.finalCategorias = home.card_categorias[1].categoria;
      this.recienAgregados = home.recienAgregados;
      this.enDescuento = home.enDescuento;
    });
  }

  filterSilders(): void {
    // this.enDescuento.sort((a, b) => (a.descuento > 0 ? -1 : 1));
  }

  ngAfterViewInit(): void {}

  public getImage(keyName: string): string {
    return `${this.API_URL}/api/file/${keyName}`;
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductoService } from '@app/core/services/liraki/producto.service';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public productos: ProductoView[] = [];


  title: string = 'fdf';

  config: SwiperConfigInterface = {

    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },


    direction: 'horizontal',
    keyboard: true,
    scrollbar: false,
    navigation: {
      nextEl: '.sp-btn-next',
      prevEl: '.sp-btn-prev'
    },
    pagination: false,
    autoplay: {
      delay: 3500
    },
    loop: true,

  };

  constructor(private productSvc: ProductoService) { }

  onIndexChange(e): void {

  }
  ngOnInit(): void {
    this.productSvc.getAllProductos()
      .subscribe((productos: ProductoView[]) => {
        this.productos = productos;
      })
  }


  ngAfterViewInit(): void {

  }




}

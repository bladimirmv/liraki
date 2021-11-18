import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  config: SwiperConfigInterface = {
    // a11y: true,
    direction: 'horizontal',
    // slidesPerView: 1,
    // slideToClickedSlide: true,
    watchSlidesProgress: true,
    // centeredSlides: true,
    // roundLengths: true,
    // loop: true,


    keyboard: true,
    scrollbar: false,
    navigation: {
      nextEl: '.sp-btn-next',
      prevEl: '.sp-btn-prev'
    },
    pagination: false,
    autoplay: true,
    loop: true,

  };

  onIndexChange(e): void {
    console.log(e);

  }
  ngOnInit(): void {

  }


  ngAfterViewInit(): void {

  }


  next(id: string): void {
    const gap: number = 0;
    const width: number = document.querySelector(`#${id}`).getBoundingClientRect().width + gap;
    document.querySelector(`#${id}`).scrollBy(width, 0)
  }

  back(id: string): void {
    const gap: number = 0;
    const width: number = document.querySelector(`#${id}`).getBoundingClientRect().width + gap;
    document.querySelector(`#${id}`).scrollBy(-width, 0)

  }
}

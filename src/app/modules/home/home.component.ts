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
    // watchSlidesProgress: true,
    // centeredSlides: true,
    // roundLengths: true,
    // loop: true,


    keyboard: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    autoplay: {
      delay: 3000
    },
    loop: true,

  };

  onIndexChange(e): void {
    console.log(e);

  }
  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    // const swiper = new Swiper('.swiper', {
    //   // Optional parameters
    //   direction: 'vertical',
    //   loop: true,

    //   // If we need pagination
    //   pagination: {
    //     el: '.swiper-pagination',
    //   },

    //   // Navigation arrows
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },

    //   // And if we need scrollbar
    //   scrollbar: {
    //     el: '.swiper-scrollbar',
    //   },
    // });

    var swiper = new Swiper(".mySwiper", {

      keyboard: true,
      scrollbar: false,
      navigation: false,
      pagination: false,
      autoplay: {
        delay: 3000
      },
      loop: true,
    });
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

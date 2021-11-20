import { MaterialModule } from './../../material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';



// import { SwiperModule } from "swiper/angular";
import { SwiperModule } from 'ngx-swiper-wrapper';
import { CardSliderComponent } from './components/card-slider/card-slider.component';
@NgModule({
  declarations: [HomeComponent, CardSliderComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SwiperModule
  ]
})
export class HomeModule { }
        //  "styles": [
        //       "src/styles.scss",
        //       "./node_modules/swiper/swiper-bundle.min.css"
        //     ],
        //     "scripts": ["./node_modules/swiper/swiper-bundle.min.js"]

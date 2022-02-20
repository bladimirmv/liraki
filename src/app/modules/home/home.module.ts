import { SharedModule } from './../../shared/shared.module';
import { MaterialModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SwiperModule,
    SharedModule,
  ],
})
export class HomeModule {}

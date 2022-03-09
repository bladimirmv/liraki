import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MaterialModule } from 'src/app/material.module';
import { CardProductComponent } from './components/card-product/card-product.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ProductsComponent, CardProductComponent, SearchComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
  ],
  exports: [
    // [SearchComponent]
  ],
})
export class ProductsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ImgPreviewComponent } from './components/img-preview/img-preview.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [ProductComponent, ImgPreviewComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule
  ]
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ImgPreviewComponent } from './components/img-preview/img-preview.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewOpinionComponent } from './components/new-opinion/new-opinion.component';


@NgModule({
  declarations: [ProductComponent, ImgPreviewComponent, NewOpinionComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }

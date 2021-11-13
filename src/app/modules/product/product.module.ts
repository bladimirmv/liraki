import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ImgPreviewComponent } from './components/img-preview/img-preview.component';
import { MaterialModule } from '@app/material.module';
import { NewComentarioComponent } from './components/new-comentario/new-comentario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductComponent, ImgPreviewComponent, NewComentarioComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductModule { }

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from '@app/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    InfiniteScrollModule,
  ],
})
export class CategoriesModule {}

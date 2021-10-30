import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppContainerComponent } from './core/app-container/app-container.component';

const routes: Routes = [

  {
    path: '', component: AppContainerComponent,
    children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }, {
        path: 'home', loadChildren: () =>
          import('./modules/home/home.module').then(m => m.HomeModule)
      }, {
        path: 'products', loadChildren: () =>
          import('./modules/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'categories', loadChildren: () =>
          import('./modules/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'about', loadChildren: () =>
          import('./modules/about/about.module').then(m => m.AboutModule)
      },
    ]
  },
  {
    path: '**', loadChildren: () =>
      import('./core/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

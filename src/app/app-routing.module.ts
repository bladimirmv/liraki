import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppContainerComponent } from './core/app-container/app-container.component';
import { SearchComponent } from './modules/products/components/search/search.component';

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
      {
        path: 'product/:uuid', loadChildren: () =>
          import('./modules/product/product.module').then(m => m.ProductModule)
      }, {
        path: 'search/:value', component: SearchComponent
      },




    ]
  },

  // {
  //   path: 'product/:uuid', component:

  // },

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

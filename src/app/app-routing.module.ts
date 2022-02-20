import { ShoppingCartResolverService } from './core/resolvers/shopping-cart-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppContainerComponent } from './core/app-container/app-container.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { SearchComponent } from './modules/products/components/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: AppContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./modules/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./modules/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'product/:uuid',
        loadChildren: () =>
          import('./modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'search/:value',
        component: SearchComponent,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'shoppingCart',
        resolve: {
          carrito: ShoppingCartResolverService,
        },
        loadChildren: () =>
          import('./modules/shopping-cart/shopping-cart.module').then(
            (m) => m.ShoppingCartModule
          ),
      },
    ],
  },

  // {
  //   path: 'product/:uuid', component:

  // },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    loadChildren: () =>
      import('./core/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

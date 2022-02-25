import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './../../shared/shared.module';
import { MaterialModule } from './../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { PedidoComponent } from './components/pedido/pedido.component';
@NgModule({
  declarations: [ShoppingCartComponent, PedidoComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ShoppingCartModule {}

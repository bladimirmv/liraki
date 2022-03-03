import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { WarningPedidoComponent } from './components/warning-pedido/warning-pedido.component';
@NgModule({
  declarations: [
    ShoppingCartComponent,
    PedidoComponent,
    WarningPedidoComponent,
  ],
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

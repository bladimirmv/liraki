import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { ProductoView } from '@models/liraki/producto.interface';
@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  @Input() producto?: ProductoView;
  @Input() empty: boolean;

  private API_URL = environment.API_URL;

  constructor() {}

  ngOnInit(): void {}

  public getImage(keyName: string): string {
    return `${this.API_URL}/api/file/${keyName}`;
  }

  public getDescuento(): string {
    let result: number = 0;
    this.producto.descuento > 100 || this.producto.descuento < 0
      ? (result = 0)
      : (result =
          this.producto.precio -
          (this.producto.precio * this.producto.descuento) / 100);
    return result.toFixed(2);
  }

  public alertStock(stock: number): string {
    return stock <= 3 && stock > 1
      ? `⏳ Solo quedan ${stock}!`
      : stock === 1
      ? `⏳ Solo queda uno!`
      : stock < 1
      ? `⛔ Agotado!`
      : `Disponible`;
  }

  public stockColor(stock: number): string {
    return stock > 3 ? 'stock-disponible' : 'stock-agotado';
  }
}

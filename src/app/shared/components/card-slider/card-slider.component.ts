import { Component, Input, OnInit } from '@angular/core';
import { FilterParams } from '@app/modules/products/products.component';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { environment } from '@env/environment';

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
})
export class CardSliderComponent implements OnInit {
  private API_URL = environment.API_URL;

  @Input() public title: string = '';
  @Input() public id: string = '';
  @Input() public products: ProductoView[] = [];
  @Input() public qParams: FilterParams = {};

  constructor() {}

  ngOnInit(): void {}

  next(): void {
    const gap: number = 0;
    const width: number =
      document.querySelector(`#${this.id}`).getBoundingClientRect().width + gap;
    document.querySelector(`#${this.id}`).scrollBy(width, 0);
  }

  back(): void {
    const gap: number = 0;
    const width: number =
      document.querySelector(`#${this.id}`).getBoundingClientRect().width + gap;
    document.querySelector(`#${this.id}`).scrollBy(-width, 0);
  }

  public getImage(keyName: string): string {
    return `${this.API_URL}/api/file/${keyName}`;
  }
}

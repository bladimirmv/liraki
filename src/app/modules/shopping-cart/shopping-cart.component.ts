import { CarritoProductoView } from '@models/liraki/carrito.producto.interface';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '@app/core/services/liraki/producto.service';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  public productos: ProductoView[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  public carritoForm: FormGroup;

  public carritoProducto: CarritoProductoView;

  constructor(
    private productSvc: ProductoService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carritoProducto = this.route.snapshot.data['carrito'];

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [true, Validators.required],
    });

    this.carritoForm = this._formBuilder.group({
      control: [
        this.carritoProducto ? this.carritoProducto : '',
        Validators.required,
      ],
    });

    this.productSvc.getAllProductos().subscribe((productos: ProductoView[]) => {
      this.productos = productos;
    });
  }
}

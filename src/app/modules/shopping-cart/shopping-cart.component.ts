import { takeUntil } from 'rxjs/operators';
import { CarritoProyectoService } from './../../core/services/liraki/carrito-proyecto.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { Usuario } from './../../shared/models/auth/usuario.interface';
import {
  CarritoProducto,
  CarritoProductoView,
} from '@models/liraki/carrito.producto.interface';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '@app/core/services/liraki/producto.service';
import { ProductoView } from '@app/shared/models/liraki/producto.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();

  public productos: ProductoView[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  private API_URL = environment.API_URL;
  public carritoForm: FormGroup;

  public carritoProducto: CarritoProductoView[] | null;
  public usuario: Usuario;
  constructor(
    private productSvc: ProductoService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private carritoSvc: CarritoProyectoService,
    private toastrSvc: ToastrService
  ) {}

  ngOnInit(): void {
    this.carritoProducto = this.route.snapshot.data['carrito'];
    this.usuario = this.route.snapshot.data['usuario'];

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

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  private initCarritoProducto(): void {
    this.carritoSvc
      .getOneCarritoProducto(this.usuario.uuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((carrito) => {
        this.carritoProducto = carrito.length ? carrito : null;
        this.carritoSvc.addCarritoStore(carrito.length ? carrito : null);
        console.log(this.carritoProducto);
      });
  }

  public getImage(keyName: string): string {
    return `${this.API_URL}/api/file/${keyName}`;
  }

  public addCarritoProducto(uuid: string): void {
    const carrito: CarritoProducto = {
      uuidCliente: this.usuario.uuid,
      uuidProducto: uuid,
      cantidad: 1,
    };

    this.carritoSvc
      .addCarritoProducto(carrito)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.toastrSvc.success(
            '😀 Se ha agregado correctamente',
            'Producto Agregado'
          );
          this.initCarritoProducto();
        }
      });
  }

  public deleteCarritoProducto(uuid: string): void {
    console.log(uuid);

    this.carritoSvc
      .deleteCarritoProducto(uuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.toastrSvc.success(
            '😀 El carrito se ha eliminado correctamente',
            'Carrito Eliminado'
          );
          this.initCarritoProducto();
        }
      });
  }
}

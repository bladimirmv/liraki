import { ProductoCard } from '@models/liraki/home.page.interface';
import { HomePageService } from '@services/liraki/home-page.service';
import { PedidoProductoService } from '@services/liraki/pedido-producto.service';
import { WarningModalComponent } from '@shared/components/warning-modal/warning-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PedidoProducto } from '@shared/models/liraki/pedido.interface';
import { Producto } from '@shared/models/liraki/producto.interface';
import { takeUntil } from 'rxjs/operators';
import { CarritoProyectoService } from '@services/liraki/carrito-proyecto.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { Usuario } from '@shared/models/auth/usuario.interface';
import {
  CarritoProducto,
  CarritoProductoView,
} from '@models/liraki/carrito.producto.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private API_URL = environment.API_URL;
  private destroy$: Subject<any> = new Subject<any>();

  public productos: ProductoCard[] = [];
  public pedidoCarritoForm: FormGroup;
  public carritoForm: FormGroup;

  public carritoProducto: CarritoProductoView[] | null;
  public usuario: Usuario;

  public breakpoint: boolean;
  public isEditable = false;
  constructor(
    private homePageSvc: HomePageService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private carritoSvc: CarritoProyectoService,
    private toastrSvc: ToastrService,
    private matDialog: MatDialog,
    private pedidoSvc: PedidoProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carritoProducto = this.route.snapshot.data['carrito'];
    this.usuario = this.route.snapshot.data['usuario'];
    this.initCarritoProductoForm();
    this.initPedidoCarritoForm();

    this.homePageSvc
      .getRecienAgregados()
      .subscribe((productos: ProductoCard[]) => {
        this.productos = productos;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public initCarritoProductoForm(): void {
    this.carritoForm = this._formBuilder.group({
      control: [
        this.carritoProducto ? this.carritoProducto : '',
        Validators.required,
      ],
    });
  }

  private initCarritoProducto(): void {
    this.carritoSvc
      .getOneCarritoProducto(this.usuario.uuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((carrito) => {
        this.carritoProducto = carrito.length ? carrito : null;
        this.carritoSvc.addCarritoStore(carrito.length ? carrito : null);
        this.initCarritoProductoForm();
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
      .subscribe(() => {
        this.initCarritoProducto();
      });
  }

  public deleteCarritoProducto(uuid: string): void {
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

  public deleteOneProducoFromCarrito(uuid: string): void {
    this.carritoSvc
      .deleteProductoFromCarrito(uuid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.toastrSvc.success(
            '😀 El producto se ha eliminado correctamente del carrito',
            'Producto Eliminado'
          );
          this.initCarritoProducto();
        }
      });
  }

  public reduceProductoCarrito(carrito: CarritoProductoView): void {
    const { producto, ...rest } = carrito;
    if (rest.cantidad < 2) {
      this.deleteOneProducoFromCarrito(rest.uuid);
      return;
    }
    rest.cantidad--;
    this.carritoSvc
      .updateCarritoProducto(rest.uuid, rest)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.initCarritoProducto();
      });
  }

  // !form pedido
  private initPedidoCarritoForm(): void {
    this.pedidoCarritoForm = this._formBuilder.group({
      nombre: [
        this.usuario ? this.usuario.nombre : '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
          ),
        ],
      ],
      apellidoPaterno: [
        this.usuario ? this.usuario.apellidoPaterno : '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(
            /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
          ),
        ],
      ],
      apellidoMaterno: [
        this.usuario ? this.usuario.apellidoMaterno : '',
        [
          Validators.maxLength(50),
          Validators.pattern(
            /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
          ),
        ],
      ],
      celular: [
        this.usuario ? this.usuario.celular : '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(8),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      direccion: [
        this.usuario ? this.usuario.direccion : '',
        [Validators.maxLength(200), Validators.required],
      ],
      correo: [
        this.usuario ? this.usuario.correo : '',
        [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)],
      ],
      nombreFactura: [
        this.usuario ? this.usuario.apellidoPaterno : '',
        Validators.required,
      ],
      nitCI: ['', Validators.required],
      tipoEnvio: ['carpinteria', Validators.required],
      descripcion: ['', [Validators.maxLength(500)]],
      metodoDePago: ['deposito_transferencia_qr', Validators.required],
    });
  }
  // ===========> isValidField
  public isValidField(field: string): {
    color?: string;
    status?: boolean;
    icon?: string;
  } {
    const validateFIeld = this.pedidoCarritoForm.get(field);
    return !validateFIeld.valid && validateFIeld.touched
      ? { color: 'warn', status: false, icon: 'close' }
      : validateFIeld.valid
      ? { color: 'accent', status: true, icon: 'done' }
      : {};
  }
  // ===========> getString
  public getString(num: number): string {
    return String(num);
  }

  public getTotalPrice(): number {
    let total: number = 0;
    this.carritoProducto.forEach((cart: CarritoProductoView) => {
      total += cart.cantidad * Number(this.getDescuento(cart.producto));
    });
    return total;
  }

  public getDescuento(producto: Producto): string {
    let result: number = 0;
    producto.descuento > 100 || producto.descuento < 0
      ? (result = 0)
      : (result =
          producto.precio - (producto.precio * producto.descuento) / 100);
    return result.toFixed(2);
  }

  public addPedido(): void {
    const pedido: PedidoProducto = this.pedidoCarritoForm.value;
    pedido.total = this.getTotalPrice();
    pedido.carrito = this.carritoProducto;
    pedido.uuidCliente = this.usuario.uuid;

    const dialogRef = this.matDialog.open(WarningModalComponent, {
      data: {
        title: '¿Estas seguro de continuar?',
        paragraph: 'No podras revertir los cambios',
        btnPrimary: 'Continuar',
        color: 'accent',
        icon: 'shopping_cart_checkout',
        navigate: false,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => {
        if (res) {
          if ((pedido.metodoDePago = 'paypal')) {
            this.pedidoSvc.paypal(pedido).subscribe((res) => {
              window.location.href = res.links[1].href;
            });

            return;
          }

          this.pedidoSvc.addPedidoProducto(pedido).subscribe((res) => {
            console.log(res);

            this.toastrSvc.success(
              '😀 Se ha agregado correctamente',
              'Pedido Realizado'
            );
          });
        }
      });
  }
}

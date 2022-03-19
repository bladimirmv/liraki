import { CarritoProductoView } from './carrito.producto.interface';
export type metodoDePago = 'efectivo' | 'deposito_transferencia_qr' | 'paypal';
export type tipoEnvio = 'delivery' | 'carpinteria';
type estado = 'pagando' | 'pendiente' | 'confirmado' | 'envio' | 'completado';

export interface Pedido {
  uuid?: string;
  creadoEn?: Date;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  celular: number;
  direccion: string;
  correo: string;
  nombreFactura: string;
  nitCI: string;
  tipoEnvio: tipoEnvio;
  descripcion?: string;
  metodoDePago: metodoDePago;
  total: number;
  uuidCliente: string;
  estado?: estado;
  numeroPedido: number;
}

export interface PedidoProducto extends Pedido {
  carrito: Array<CarritoProductoView>;
}

export interface CarritoPedido {
  uuid?: string;
  creadoEn?: Date;
  cantidad: number;
  uuidProducto: string;
  uuidPedido: string;
  precio: number;
  descuento: number;
  nombre: string;
  descripcion: string;
}

export interface PedidoProductoView extends Pedido {
  carrito: Array<CarritoPedido>;
}

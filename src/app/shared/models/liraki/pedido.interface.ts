import { CarritoProductoView } from './carrito.producto.interface';
export type metodoDePago = 'efectivo' | 'deposito_transferencia_qr' | 'paypal';
export type tipoEnvio = 'delivery' | 'carpinteria';

export interface PedidoProducto {
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
  carrito: Array<CarritoProductoView>;
  uuidCliente: string;
}

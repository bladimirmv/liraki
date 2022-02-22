import { Producto } from './producto.interface';
export interface CarritoProducto {
  uuid?: string;
  creadoEn?: Date;
  uuidProducto: string;
  uuidCliente: string;
  cantidad: number;
}

export interface CarritoProductoView extends CarritoProducto {
  producto: { keyName: string } & Producto;
}

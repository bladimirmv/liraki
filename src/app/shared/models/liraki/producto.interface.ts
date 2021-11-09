import { CategoriaProducto } from './categoria.producto.interface';

export interface Producto {
  uuid?: string;
  creadoEn?: Date;
  nombre: string;
  descripcion?: string;
  precio?: number;
  moneda?: string;
  stock: number;
  descuento: number;
  estado: boolean;
}

export interface FotoProducto {
  uuid?: string;
  creadoEn?: Date;
  nombre?: string;
  indice?: number;
  keyName?: string;
  location?: string;
  size?: number;
  uuidProducto: string;
}

export interface DetalleCategoriaProducto {
  uuid?: string;
  uuidCategoria: string;
  uuidProducto: string;
}

export interface ProductoView extends Producto {
  categorias: Array<CategoriaProducto>;
  fotos: Array<FotoProducto>;
}

export interface ResponseProducto {
  message: string;
  data: Producto;
}


export interface ProductoResponse {
  message: string;
  body: string;
}

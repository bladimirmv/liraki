import { CategoriaProducto } from './categoria.producto.interface';
import { Producto } from './producto.interface';
type IdCard = 'recien-agregados' | 'en-descuento';

export interface ProductoCard extends Producto {
  keyName: string;
}

export interface HomePage {
  recienAgregados: Array<ProductoCard>;
  enDescuento: Array<ProductoCard>;
  card_producto: Array<{
    id: IdCard | string;
    nombre: string;
    queryParams: string;
    producto: Array<ProductoCard>;
  }>;

  card_categorias: Array<{
    categoria: Array<CategoriaProducto>;
  }>;
}

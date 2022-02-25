export interface CategoriaProducto {
  uuid: string;
  creadoEn?: Date;
  nombre: string;
  descripcion?: string;
  keyName: string;
  fileName: string;
  location: string;
  size: number;
  estado?: boolean;
}

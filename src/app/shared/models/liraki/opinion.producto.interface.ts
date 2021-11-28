import { Usuario } from "../usuario.interface";

export interface OpinionProducto {
  uuid: string;
  creadoEn: Date;
  titulo: string;
  descripcion: string;
  estado: boolean;
  verificado: boolean;
  puntuacion: number;
  uuidProducto: string;
  uuidCliente: string;
}


export interface OpinionProductoView extends OpinionProducto {
  usuario: Usuario
}




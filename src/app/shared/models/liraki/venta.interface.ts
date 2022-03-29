import { ProductoView } from './producto.interface';
export type departamento = 'cbba' | 'lp' | 'scz';
export type tipoEnvio = 'delivery' | 'personal';
export type tipoVenta = 'fisica' | 'online';
export type metodoDePago =
  | 'efectivo'
  | 'tarjeta'
  | 'paypal'
  | 'deposito_transferencia_qr';
export type estado =
  | 'pagando'
  | 'pendiente'
  | 'confirmado'
  | 'en_envio'
  | 'para_recoger'
  | 'completado';

export interface Venta {
  uuid?: string;
  creadoEn?: Date;
  numeroVenta: number;
  nombreFactura: string;
  nitCiCex: string;
  departamento: departamento;
  direccion: string;
  descripcion?: string;
  tipoVenta: tipoVenta;
  tipoEnvio: tipoEnvio;
  metodoDePago: metodoDePago;
  estado: estado;
  total?: number;
  uuidCliente: string;
  uuidVendedor: string;
}

export interface ConceptoVenta {
  uuid?: string;
  creadoEn?: Date;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  importe?: number;
  uuidProducto: string;
  uuidVenta?: string;
}

export interface ConceptoVentaView extends ConceptoVenta {
  producto?: ProductoView;
  nombre?: string;
  stock?: number;
}

export interface VentaProducto extends Venta {
  conceptos: ConceptoVentaView[];
}

export interface VentaView extends Venta {
  vendedor?: string;
  cliente?: string;
  conceptos: ConceptoVentaView[];
}

import {Entity, model, property, hasMany} from '@loopback/repository';
import {Venta} from './venta.model';
import {VentaProducto} from './venta-producto.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precioVenta: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidadDisponible: number;

  @property({
    type: 'string',
    required: false,
  })
  foto: string;

  @hasMany(() => Venta, {through: {model: () => VentaProducto}})
  ventas: Venta[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;

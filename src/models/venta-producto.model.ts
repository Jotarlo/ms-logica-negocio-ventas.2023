import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_venta_producto_idProducto: {
        name: "fk_venta_producto_idProducto",
        entity: "Producto",
        entityKey: "id",
        foreignKey: "productoId"
      },
      fk_venta_producto_idVenta: {
        name: "fk_venta_producto_idVenta",
        entity: "Venta",
        entityKey: "id",
        foreignKey: "ventaId"
      },
    }
  }
})
export class VentaProducto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precioUnitario: number;

  @property({
    type: 'number',
  })
  productoId?: number;

  @property({
    type: 'number',
  })
  ventaId?: number;

  constructor(data?: Partial<VentaProducto>) {
    super(data);
  }
}

export interface VentaProductoRelations {
  // describe navigational properties here
}

export type VentaProductoWithRelations = VentaProducto & VentaProductoRelations;

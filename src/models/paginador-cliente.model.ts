import {Model, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class PaginadorCliente extends Model {
  @property({
    type: 'number',
    required: true,
  })
  totalRegistros: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  registros: Cliente[];

  constructor(data?: Partial<PaginadorCliente>) {
    super(data);
  }
}

export interface PaginadorClienteRelations {
  // describe navigational properties here
}

export type PaginadorClienteWithRelations = PaginadorCliente & PaginadorClienteRelations;

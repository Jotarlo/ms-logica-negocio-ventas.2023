import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Venta,
  Cliente,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaClienteController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Venta.prototype.id,
  ): Promise<Cliente> {
    return this.ventaRepository.cliente(id);
  }
}

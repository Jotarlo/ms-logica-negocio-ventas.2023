import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Venta} from '../models';
import {VentaRepository} from '../repositories';

export class VentaController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository : VentaRepository,
  ) {}

  @post('/venta')
  @response(200, {
    description: 'Venta model instance',
    content: {'application/json': {schema: getModelSchemaRef(Venta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVenta',
            exclude: ['id'],
          }),
        },
      },
    })
    venta: Omit<Venta, 'id'>,
  ): Promise<Venta> {
    return this.ventaRepository.create(venta);
  }

  @get('/venta/count')
  @response(200, {
    description: 'Venta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Venta) where?: Where<Venta>,
  ): Promise<Count> {
    return this.ventaRepository.count(where);
  }

  @get('/venta')
  @response(200, {
    description: 'Array of Venta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Venta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Venta) filter?: Filter<Venta>,
  ): Promise<Venta[]> {
    return this.ventaRepository.find(filter);
  }

  @patch('/venta')
  @response(200, {
    description: 'Venta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Venta,
    @param.where(Venta) where?: Where<Venta>,
  ): Promise<Count> {
    return this.ventaRepository.updateAll(venta, where);
  }

  @get('/venta/{id}')
  @response(200, {
    description: 'Venta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Venta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Venta, {exclude: 'where'}) filter?: FilterExcludingWhere<Venta>
  ): Promise<Venta> {
    return this.ventaRepository.findById(id, filter);
  }

  @patch('/venta/{id}')
  @response(204, {
    description: 'Venta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Venta,
  ): Promise<void> {
    await this.ventaRepository.updateById(id, venta);
  }

  @put('/venta/{id}')
  @response(204, {
    description: 'Venta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() venta: Venta,
  ): Promise<void> {
    await this.ventaRepository.replaceById(id, venta);
  }

  @del('/venta/{id}')
  @response(204, {
    description: 'Venta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ventaRepository.deleteById(id);
  }
}

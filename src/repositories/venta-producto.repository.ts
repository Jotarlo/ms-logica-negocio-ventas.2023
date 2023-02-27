import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {VentaProducto, VentaProductoRelations} from '../models';

export class VentaProductoRepository extends DefaultCrudRepository<
  VentaProducto,
  typeof VentaProducto.prototype.id,
  VentaProductoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(VentaProducto, dataSource);
  }
}

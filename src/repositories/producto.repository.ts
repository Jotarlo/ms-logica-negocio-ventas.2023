import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Producto, ProductoRelations, Venta, VentaProducto} from '../models';
import {VentaProductoRepository} from './venta-producto.repository';
import {VentaRepository} from './venta.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly ventas: HasManyThroughRepositoryFactory<Venta, typeof Venta.prototype.id,
          VentaProducto,
          typeof Producto.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VentaProductoRepository') protected ventaProductoRepositoryGetter: Getter<VentaProductoRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Producto, dataSource);
    this.ventas = this.createHasManyThroughRepositoryFactoryFor('ventas', ventaRepositoryGetter, ventaProductoRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
  }
}

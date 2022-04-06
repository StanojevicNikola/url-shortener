import { inject } from '@loopback/core';
import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Url, UrlRelations } from '../models';

export class UrlRepository extends DefaultCrudRepository<
  Url,
  typeof Url.prototype.id,
  UrlRelations
> {
  constructor(@inject('datasources.postgres') dataSource: juggler.DataSource) {
    super(Url, dataSource);
  }
}

import { inject } from '@loopback/core';
import { DefaultKeyValueRepository, juggler } from '@loopback/repository';
import { UrlCache } from '../models';

export class UrlCacheRepository extends DefaultKeyValueRepository<UrlCache> {
  constructor(@inject('datasources.redis') dataSource: juggler.DataSource) {
    super(UrlCache, dataSource);
  }
}

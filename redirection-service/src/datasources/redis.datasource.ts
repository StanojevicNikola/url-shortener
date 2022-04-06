import { redisConfig } from './../config';
import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

@lifeCycleObserver('datasource')
export class RedisDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'redis';
  static readonly defaultConfig = redisConfig;

  constructor(
    @inject('datasources.config.redis', { optional: true })
    dsConfig: object = redisConfig,
  ) {
    super(dsConfig);
  }
}

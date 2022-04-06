import { postgresConfig } from './../config';
import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler, AnyObject } from '@loopback/repository';

@lifeCycleObserver('datasource')
export class PostgresDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'postgres';
  static readonly defaultConfig = postgresConfig;

  constructor(
    @inject('datasources.config.postgres', { optional: true })
    dsConfig: AnyObject = postgresConfig,
  ) {
    super(dsConfig);
  }
}

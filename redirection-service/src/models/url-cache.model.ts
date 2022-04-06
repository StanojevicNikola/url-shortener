/* eslint-disable @typescript-eslint/no-empty-interface */
import { Model, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class UrlCache extends Model {
  @property({
    type: 'string',
  })
  id: string;

  @property({
    type: 'string',
  })
  realUrl: string;

  constructor(data?: Partial<UrlCache>) {
    super(data);
  }
}

export interface UrlCacheRelations {}

export type UrlCacheWithRelations = UrlCache & UrlCacheRelations;

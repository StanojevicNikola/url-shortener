/* eslint-disable @typescript-eslint/no-empty-interface */
import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    postgresql: { table: 'urls' },
  },
})
export class Url extends Entity {
  @property({
    id: true,
    generated: true,
    useDefaultIdType: false,
    jsonSchema: {
      readOnly: true,
    },
    postgresql: {
      dataType: 'uuid',
    },
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'real_url',
    },
  })
  realUrl: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'short_url',
    },
  })
  shortUrl?: string;

  @property({
    type: 'date',
    defaultFn: 'now',
    jsonSchema: {
      readOnly: true,
    },
    postgresql: {
      columnName: 'created_at',
    },
  })
  createdAt: Date;

  @property({
    type: 'date',
    defaultFn: 'now',
    postgresql: {
      columnName: 'updated_at',
    },
  })
  updatedAt: Date;

  constructor(data?: Partial<Url>) {
    super(data);
  }
}

export interface UrlRelations {}

export type UrlWithRelations = Url & UrlRelations;

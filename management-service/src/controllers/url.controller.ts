import { RabbitmqProducerAction } from './../types/index';
import { inject } from '@loopback/core';
import { Filter, repository } from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import { RabbitmqBindings, RabbitmqProducer } from 'loopback-rabbitmq';
import { Md5 } from 'ts-md5';
import { redirectionServiceConfig } from '../config';
import { Url } from '../models';
import { UrlRepository } from '../repositories';

export class UrlController {
  constructor(
    @inject(RabbitmqBindings.RABBITMQ_PRODUCER)
    public rabbitmqProducer: RabbitmqProducer,
    @repository(UrlRepository)
    public urlRepository: UrlRepository,
  ) {}

  @post('/urls')
  @response(200, {
    description: 'Url model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Url) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Url, {
            title: 'NewUrl',
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    })
    url: Omit<Url, 'id'>,
  ): Promise<Url> {
    const urlEntity = await this.urlRepository.create(url);
    const hash = Md5.hashStr(urlEntity.id);
    const shortUrl = `${redirectionServiceConfig.redirectionAppUrl}/${hash}`;
    Object.assign(urlEntity, { shortUrl });
    await this.rabbitmqProducer.publish('messaging.direct', 'tenant.webhook', {
      action: RabbitmqProducerAction.URL_CREATE,
      data: {
        hash,
        ...urlEntity,
      },
    });
    return this.urlRepository.save(urlEntity);
  }

  @get('/urls')
  @response(200, {
    description: 'Array of Url model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Url, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Url, { exclude: ['fields'] })
    filter?: Omit<Filter<Url>, 'fields'>,
  ): Promise<Url[]> {
    return this.urlRepository.find(filter);
  }

  @del('/urls/{id}')
  @response(204, {
    description: 'Url DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.urlRepository.deleteById(id);
    await this.rabbitmqProducer.publish('messaging.direct', 'tenant.webhook', {
      action: RabbitmqProducerAction.URL_DELETE,
      data: {
        hash: Md5.hashStr(id),
      },
    });
  }
}

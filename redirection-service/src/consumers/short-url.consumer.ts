import { AnyObject, repository } from '@loopback/repository';
import { rabbitConsume } from 'loopback-rabbitmq';
import { UrlCacheRepository } from '../repositories';
import { RabbitmqProducerAction } from './../types';

interface Message {
  action: string;
  data: AnyObject;
}

export class ShortUrlConsumer {
  constructor(
    @repository(UrlCacheRepository)
    private urlCacheRepository: UrlCacheRepository,
  ) {}

  @rabbitConsume({
    exchange: 'messaging.direct',
    routingKey: 'tenant.webhook',
    queue: 'shortUrl',
  })
  async handle(message: Message) {
    const { action, data } = message;
    switch (action) {
      case RabbitmqProducerAction.URL_CREATE:
        await this.urlCacheRepository.set(data.hash, {
          id: data.id,
          realUrl: data.realUrl,
        });
        break;
      case RabbitmqProducerAction.URL_DELETE:
        await this.urlCacheRepository.delete(data.hash);
        break;
      default:
        break;
    }
  }
}

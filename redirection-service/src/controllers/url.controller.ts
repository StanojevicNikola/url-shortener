import { repository } from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  response,
} from '@loopback/rest';
import { UrlCache } from '../models';
import { UrlCacheRepository } from '../repositories';

export class UrlController {
  constructor(
    @repository(UrlCacheRepository)
    public urlCacheRepository: UrlCacheRepository,
  ) {}

  // @ratelimit(true, {
  //   windowMs: 10 * 1000,
  //   max: 3,
  // })
  @get('/urls/{hash}')
  @response(200, {
    description: 'UrlCache model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UrlCache),
      },
    },
  })
  async getUrlByHash(
    @param.path.string('hash') hash: string,
  ): Promise<UrlCache> {
    const urlCache = await this.urlCacheRepository.get(hash);
    if (!urlCache)
      throw new HttpErrors.NotFound(`Url with hash ${hash} not found`);

    return urlCache;
  }
}

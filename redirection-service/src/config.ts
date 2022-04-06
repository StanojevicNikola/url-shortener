import dotenv from 'dotenv';
import { RabbitmqConfig, RedisConfig } from './types';

dotenv.config();

const {
  // redis
  REDIS_HOST,
  REDIS_PORT,
  // rabbitMq configuration
  RABBITMQ_PROTOCOL,
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
  RABBITMQ_VHOST,
} = process.env;

export const redisConfig: RedisConfig = {
  name: 'redis',
  connector: 'kv-redis',
  host: REDIS_HOST ?? '127.0.0.1',
  port: REDIS_PORT === undefined ? 6379 : +REDIS_PORT,
};

export const rabbitmqConfig: RabbitmqConfig = {
  protocol: RABBITMQ_PROTOCOL ?? 'amqp',
  hostname: RABBITMQ_HOST ?? '127.0.0.1',
  port: RABBITMQ_PORT === undefined ? 5672 : +RABBITMQ_PORT,
  username: RABBITMQ_USERNAME ?? 'guest',
  password: RABBITMQ_PASSWORD ?? 'guest',
  vhost: RABBITMQ_VHOST ?? '/',
};

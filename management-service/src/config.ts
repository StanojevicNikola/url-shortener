import dotenv from 'dotenv';
import { PostgresConfig, RabbitmqConfig } from './types';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  REDIRECTION_APP_URL,
  // rabbitMq configuration
  RABBITMQ_PROTOCOL,
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
  RABBITMQ_VHOST,
} = process.env;

export const postgresConfig: PostgresConfig = {
  name: 'postgres',
  connector: 'postgresql',
  host: POSTGRES_HOST ?? '127.0.0.1',
  port: POSTGRES_PORT ?? '5432',
  database: POSTGRES_DB ?? 'postgres',
  user: POSTGRES_USER ?? 'postgres',
  password: POSTGRES_PASSWORD ?? 'postgres',
};

export const redirectionServiceConfig = {
  redirectionAppUrl: REDIRECTION_APP_URL,
};

export const rabbitmqConfig: RabbitmqConfig = {
  protocol: RABBITMQ_PROTOCOL ?? 'amqp',
  hostname: RABBITMQ_HOST ?? '127.0.0.1',
  port: RABBITMQ_PORT === undefined ? 5672 : +RABBITMQ_PORT,
  username: RABBITMQ_USERNAME ?? 'guest',
  password: RABBITMQ_PASSWORD ?? 'guest',
  vhost: RABBITMQ_VHOST ?? '/',
};

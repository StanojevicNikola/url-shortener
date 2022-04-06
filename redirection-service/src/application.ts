import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { ServiceMixin } from '@loopback/service-proxy';
import {
  ConsumersBooter,
  MessageHandlerErrorBehavior,
  QueueComponent,
  RabbitmqBindings,
  RabbitmqComponent,
  RabbitmqComponentConfig,
} from 'loopback-rabbitmq';
import path from 'path';
import { rabbitmqConfig } from './config';
import { MySequence } from './sequence';

export { ApplicationConfig };

export class RedirectionServiceApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.setUpBindings();

    this.sequence(MySequence);

    this.static('/', path.join(__dirname, '../public'));

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });

    this.component(RestExplorerComponent);
    this.component(RabbitmqComponent);
    this.component(QueueComponent);

    this.booters(ConsumersBooter);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  setUpBindings(): void {
    console.log('Setting up bindings...');
    this.configure<RabbitmqComponentConfig>(RabbitmqBindings.COMPONENT).to({
      options: rabbitmqConfig,
      // configurations below are optional, (Default values)
      producer: {
        idleTimeoutMillis: 10000,
      },
      consumer: {
        retries: 10, // number of retries, 0 is forever
        interval: 1500, // retry interval in ms
      },
      defaultConsumerErrorBehavior: MessageHandlerErrorBehavior.NACK,
      prefetchCount: 10,
      exchanges: [
        {
          name: 'loopback.direct',
          type: 'direct',
        },
        {
          name: 'messaging.direct',
          type: 'direct',
        },
      ],
    });
  }

  async boot() {
    console.log('Booting...');

    return super.boot();
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async start(): Promise<void> {
    console.log('Starting...');

    if (this.options.databaseSeeding !== false) {
      console.log('Migrating...');
      await this.migrateSchema();
    }

    return super.start();
  }
}

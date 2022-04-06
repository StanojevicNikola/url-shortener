import { ApplicationConfig } from '@loopback/core';
import { RedirectionServiceApplication } from './application';

async function exportOpenApiSpec(): Promise<void> {
  const config: ApplicationConfig = {
    rest: {
      port: +(process.env.PORT ?? 3001),
      host: process.env.HOST ?? 'localhost',
    },
  };
  const outFile = process.argv[2] ?? 'openapi-spec.json';
  const app = new RedirectionServiceApplication(config);
  await app.boot();
  await app.exportOpenApiSpec(outFile);
}

exportOpenApiSpec().catch(err => {
  console.error('Fail to export OpenAPI spec from the application.', err);
  process.exit(1);
});

import {
  ApplicationConfig,
  RedirectionServiceApplication,
} from './application';
import dotenv from 'dotenv';

dotenv.config();

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new RedirectionServiceApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`----------------------------------------`);
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
  console.log(`----------------------------------------`);

  return app;
}

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3001),
      host: process.env.HOST,
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
    databaseSeeding: false,
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}

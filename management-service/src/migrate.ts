import { ManagementServiceApplication } from './application';
import dotenv from 'dotenv';

export async function migrate(args: string[]) {
  dotenv.config();
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new ManagementServiceApplication();
  await app.boot();
  await app.migrateSchema({ existingSchema, models: ['Url'] });

  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});

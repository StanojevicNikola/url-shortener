import { Client } from '@loopback/testlab';
import { ManagementServiceApplication } from '../../application';
import { setupApplication } from './test-helper';

describe('UrlController', () => {
  let app: ManagementServiceApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({ app, client } = await setupApplication());
  });

  it('creates a url', async () => {
    const realUrl = 'www.testurl.com';
    await client.post('/urls').send({ realUrl }).expect(200);
  });

  after(async () => {
    await app.stop();
  });
});

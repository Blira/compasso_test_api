import { ClientEntity } from './entities/client';

import { PostgresDatabaseConnection } from './postgres-connection';

const sut = new PostgresDatabaseConnection();

describe('PostgresDatabaseConnection', () => {
  afterAll(async () => {
    await sut.disconnect();
  });

  it('Should connect to postgres database', async () => {
    await sut.connect();
    const postgresConnection = await sut.getConnection();
    expect(postgresConnection.isConnected).toBeTruthy();
  });

  it('Should reconnect if postgres is down', async () => {
    let clientRepository = await sut.getRepository<ClientEntity>('clients');
    expect(clientRepository).toBeTruthy();
    await sut.disconnect();
    clientRepository = await sut.getRepository<ClientEntity>('clients');
    expect(clientRepository).toBeTruthy();
  });
});

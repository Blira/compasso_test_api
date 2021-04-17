import { UserEntity } from './entities/user';
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
    let userRepository = await sut.getRepository<UserEntity>('users');
    expect(userRepository).toBeTruthy();
    await sut.disconnect();
    userRepository = await sut.getRepository<UserEntity>('users');
    expect(userRepository).toBeTruthy();
  });
});

import {
  Connection,
  createConnection,
  getConnection,
  Repository,
} from 'typeorm';

export class PostgresDatabaseConnection {
  private connectionName: string;
  async connect(connectionName?: string): Promise<void> {
    this.connectionName = connectionName ?? 'default';
    await createConnection(connectionName);
  }

  async getConnection(): Promise<Connection> {
    return getConnection(this.connectionName);
  }

  async disconnect(): Promise<void> {
    await getConnection(this.connectionName).close();
  }

  async getRepository<T>(name: string): Promise<Repository<T>> {
    if (!getConnection(this.connectionName).isConnected) {
      await this.connect(this.connectionName);
    }
    return getConnection(this.connectionName).getRepository(name);
  }
}

import { Repository } from 'typeorm';
import { ClientRepository } from '../../../../../data/protocols/client-repository';
import { ClientModel } from '../../../../../domain/models/client';
import { FetchClientFilter } from '../../../../../domain/usecases/client/fetch-client';
import { RegisterClientModel } from '../../../../../domain/usecases/client/register-client';
import { UpdateClientData } from '../../../../../domain/usecases/client/update-client';
import { DatabaseConnection } from '../../../../../main/instances-container';
import { CityEntity } from '../../entities/city';
import { ClientEntity } from '../../entities/client';

export class PostgresClientRepository implements ClientRepository {
  private clientRepository: Repository<ClientEntity>;
  constructor() {
    DatabaseConnection.getRepository<ClientEntity>('clients')
      .then(repository => {
        this.clientRepository = repository;
      })
      .catch(e => console.log(e));
  }

  async insert(registerClientData: RegisterClientModel): Promise<ClientModel> {
    const clientRepository = await DatabaseConnection.getRepository<ClientEntity>(
      'clients',
    );

    const newClient = clientRepository.create(registerClientData);
    await clientRepository.save(newClient);
    return newClient;
  }

  async find(fetchClientFilter: FetchClientFilter): Promise<ClientModel[]> {
    const cities = await this.clientRepository.find(fetchClientFilter);
    return cities;
  }

  async delete(client_id: string): Promise<void> {
    await this.clientRepository.delete({ id: client_id });
  }

  async update(updateClientData: UpdateClientData): Promise<ClientModel> {
    // const updatedClient = await this.clientRepository.save(updateClientData);
    await this.clientRepository.update(
      { id: updateClientData.id },
      updateClientData,
    );
    const updatedClient = await this.clientRepository.findOne(
      updateClientData.id,
    );
    return updatedClient;
  }
}

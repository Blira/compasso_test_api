import { ClientRepository } from '../../../../../data/protocols/client-repository';
import { ClientModel } from '../../../../../domain/models/client';
import { RegisterClientModel } from '../../../../../domain/usecases/client/register-client';
import { DatabaseConnection } from '../../../../../main/instances-container';
import { ClientEntity } from '../../entities/client';

export class PostgresClientRepository implements ClientRepository {
  async insert(registerClientData: RegisterClientModel): Promise<ClientModel> {
    const clientRepository = await DatabaseConnection.getRepository<ClientEntity>(
      'clients',
    );

    const newClient = clientRepository.create(registerClientData);
    await clientRepository.save(newClient);
    return newClient;
  }
}

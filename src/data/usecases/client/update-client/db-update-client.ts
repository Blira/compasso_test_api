import { ClientModel } from '../../../../domain/models/client';
import {
  UpdateClient,
  UpdateClientData,
} from '../../../../domain/usecases/client/update-client';
import { ClientRepository } from '../../../protocols/client-repository';

export class DbUpdateClient implements UpdateClient {
  private readonly clientRepository: ClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async update(updateClientData: UpdateClientData): Promise<ClientModel> {
    const updatedClient = await this.clientRepository.update(updateClientData);
    return updatedClient;
  }
}

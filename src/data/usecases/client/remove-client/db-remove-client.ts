import { RemoveClient } from '../../../../domain/usecases/client/remove-client';
import { ClientRepository } from '../../../protocols/client-repository';

export class DbRemoveClient implements RemoveClient {
  private readonly clientRepository: ClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async remove(client_id: string): Promise<void> {
    await this.clientRepository.delete(client_id);
  }
}

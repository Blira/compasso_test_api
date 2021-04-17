import { ClientModel } from '../../../../domain/models/client';
import {
  RegisterClient,
  RegisterClientModel,
} from '../../../../domain/usecases/client/register-client';
import { ClientRepository } from '../../../protocols/client-repository';

export class DbRegisterClient implements RegisterClient {
  private readonly clientRepository: ClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async register(
    registerClientData: RegisterClientModel,
  ): Promise<ClientModel> {
    const registeredClient = await this.clientRepository.insert(
      registerClientData,
    );
    return registeredClient;
  }
}

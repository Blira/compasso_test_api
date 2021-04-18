import { ClientModel } from '../../../../domain/models/client';
import {
  FetchClient,
  FetchClientFilter,
} from '../../../../domain/usecases/client/fetch-client';
import { ClientRepository } from '../../../protocols/client-repository';

export class DbFetchClient implements FetchClient {
  private readonly clientRepository: ClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async fetch(fetchClientFilter: FetchClientFilter): Promise<ClientModel[]> {
    const cities = await this.clientRepository.find(fetchClientFilter);
    return cities;
  }
}

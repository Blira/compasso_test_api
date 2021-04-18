import { ClientModel } from '../../domain/models/client';
import { FetchClientFilter } from '../../domain/usecases/client/fetch-client';
import { RegisterClientModel } from '../../domain/usecases/client/register-client';

export interface ClientRepository {
  insert(registerClientData: RegisterClientModel): Promise<ClientModel>;
  find(fetchClientFilter: FetchClientFilter): Promise<ClientModel[]>;
  delete(client_id: string): Promise<void>;
}

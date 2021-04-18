import { ClientModel } from '../../domain/models/client';
import { FetchClientFilter } from '../../domain/usecases/client/fetch-client';
import { RegisterClientModel } from '../../domain/usecases/client/register-client';
import { UpdateClientData } from '../../domain/usecases/client/update-client';

export interface ClientRepository {
  insert(registerClientData: RegisterClientModel): Promise<ClientModel>;
  update(updateClientData: UpdateClientData): Promise<ClientModel>;
  find(fetchClientFilter: FetchClientFilter): Promise<ClientModel[]>;
  delete(client_id: string): Promise<void>;
}

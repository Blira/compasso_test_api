import { ClientModel } from '../../domain/models/client';
import { RegisterClientModel } from '../../domain/usecases/client/register-client';

export interface ClientRepository {
  insert(registerClientData: RegisterClientModel): Promise<ClientModel>;
}

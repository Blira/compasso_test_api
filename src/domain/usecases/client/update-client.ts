import { ClientModel } from '../../models/client';

export interface UpdateClientData {
  id: string;
  name: string;
}

export interface UpdateClient {
  update(updateClientData: UpdateClientData): Promise<ClientModel>;
}

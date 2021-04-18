import { ClientModel } from '../../models/client';

export interface FetchClientFilter {
  name?: string;
  city_id?: string;
  sex?: string;
}

export interface FetchClient {
  fetch(fetchClientFilter: FetchClientFilter): Promise<ClientModel[]>;
}

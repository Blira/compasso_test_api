import { ClientModel } from '../../models/client';

export interface RegisterClientModel {
  name: string;
  sex: string;
  birthDate: Date;
  age: number;
  city_id: string;
}

export interface RegisterClient {
  register(registerClientData: RegisterClientModel): Promise<ClientModel>;
}

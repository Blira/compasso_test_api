import { CityModel } from '../../models/city';

export interface RegisterCityModel {
  name: string;
  state: string;
}

export interface RegisterCity {
  register(registerCityData: RegisterCityModel): Promise<CityModel>;
}

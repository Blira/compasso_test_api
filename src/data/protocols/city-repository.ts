import { CityModel } from '../../domain/models/city';
import { RegisterCityModel } from '../../domain/usecases/city/register-city';

export interface CityRepository {
  insert(registerCityData: RegisterCityModel): Promise<CityModel>;
}

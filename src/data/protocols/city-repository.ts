import { CityModel } from '../../domain/models/city';
import { FetchCityFilter } from '../../domain/usecases/city/fetch-city';
import { RegisterCityModel } from '../../domain/usecases/city/register-city';

export interface CityRepository {
  insert(registerCityData: RegisterCityModel): Promise<CityModel>;
  find(fetchCityFilter: FetchCityFilter): Promise<CityModel[]>;
}

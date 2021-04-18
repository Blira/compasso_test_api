import { DbFetchCity } from '../../data/usecases/city/fetch-city/db-fetch-city';
import { DbRegisterCity } from '../../data/usecases/city/register-city/db-register-city';
import { FetchCityFilter } from '../../domain/usecases/city/fetch-city';
import { PostgresCityRepository } from '../../infra/db/postgres/repositories/city/city-repository';
import { FetchCityController } from '../../presentation/controllers/city/fetch/fetch-city';
import { RegisterCityController } from '../../presentation/controllers/city/register/register-city';

export const createRegisterCityController = (): RegisterCityController => {
  const cityRepository = new PostgresCityRepository();
  const registerCity = new DbRegisterCity(cityRepository);
  return new RegisterCityController(registerCity);
};

export const createFetchCityController = (): FetchCityController => {
  const cityRepository = new PostgresCityRepository();
  const fetchCity = new DbFetchCity(cityRepository);
  return new FetchCityController(fetchCity);
};

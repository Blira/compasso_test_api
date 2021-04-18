import { DbRegisterCity } from '../../data/usecases/city/register-city/db-register-city';
import { PostgresCityRepository } from '../../infra/db/postgres/repositories/city/city-repository';
import { RegisterCityController } from '../../presentation/controllers/city/register/register-city';

export const createRegisterCityController = (): RegisterCityController => {
  const cityRepository = new PostgresCityRepository();
  const registerCity = new DbRegisterCity(cityRepository);
  return new RegisterCityController(registerCity);
};

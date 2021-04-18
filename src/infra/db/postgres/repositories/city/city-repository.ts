import { CityRepository } from '../../../../../data/protocols/city-repository';
import { CityModel } from '../../../../../domain/models/city';
import { RegisterCityModel } from '../../../../../domain/usecases/city/register-city';
import { DatabaseConnection } from '../../../../../main/instances-container';
import { CityEntity } from '../../entities/city';

export class PostgresCityRepository implements CityRepository {
  async insert(registerCityData: RegisterCityModel): Promise<CityModel> {
    const cityRepository = await DatabaseConnection.getRepository<CityEntity>(
      'cities',
    );

    const newCity = cityRepository.create(registerCityData);
    await cityRepository.save(newCity);
    return newCity;
  }
}

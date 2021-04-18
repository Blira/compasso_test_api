import { Repository } from 'typeorm';
import { CityRepository } from '../../../../../data/protocols/city-repository';
import { CityModel } from '../../../../../domain/models/city';
import { FetchCityFilter } from '../../../../../domain/usecases/city/fetch-city';
import { RegisterCityModel } from '../../../../../domain/usecases/city/register-city';
import { DatabaseConnection } from '../../../../../main/instances-container';
import { CityEntity } from '../../entities/city';

export class PostgresCityRepository implements CityRepository {
  private cityRepository: Repository<CityEntity>;
  constructor() {
    DatabaseConnection.getRepository<CityEntity>('cities')
      .then(repository => {
        this.cityRepository = repository;
      })
      .catch(e => console.log(e));
  }

  async insert(registerCityData: RegisterCityModel): Promise<CityModel> {
    const newCity = this.cityRepository.create(registerCityData);
    await this.cityRepository.save(newCity);
    return newCity;
  }

  async find(fetchCityFilter: FetchCityFilter): Promise<CityModel[]> {
    const cities = await this.cityRepository.find(fetchCityFilter);
    return cities;
  }
}

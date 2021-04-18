import { CityModel } from '../../../../domain/models/city';
import {
  FetchCity,
  FetchCityFilter,
} from '../../../../domain/usecases/city/fetch-city';
import { CityRepository } from '../../../protocols/city-repository';

export class DbFetchCity implements FetchCity {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async fetch(fetchCityFilter: FetchCityFilter): Promise<CityModel[]> {
    const cities = await this.cityRepository.find(fetchCityFilter);
    return cities;
  }
}

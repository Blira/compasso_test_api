import { CityModel } from '../../../../domain/models/city';
import {
  RegisterCity,
  RegisterCityModel,
} from '../../../../domain/usecases/city/register-city';
import { CityRepository } from '../../../protocols/city-repository';

export class DbRegisterCity implements RegisterCity {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async register(registerCityData: RegisterCityModel): Promise<CityModel> {
    const registeredCity = await this.cityRepository.insert(registerCityData);
    return registeredCity;
  }
}

import { CityModel } from '../../models/city';

export interface FetchCityFilter {
  name?: string;
  state?: string;
}

export interface FetchCity {
  fetch(fetchCityFilter: FetchCityFilter): Promise<CityModel[]>;
}

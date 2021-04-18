import {
  FetchCity,
  FetchCityFilter,
} from '../../../../domain/usecases/city/fetch-city';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';

export class FetchCityController implements Controller {
  private readonly fetchCity: FetchCity;

  constructor(fetchCity: FetchCity) {
    this.fetchCity = fetchCity;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { query: filter }: { query?: FetchCityFilter } = httpRequest;

      const cities = await this.fetchCity.fetch(filter);
      return {
        statusCode: 200,
        body: cities,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: 'Internal server error' },
      };
    }
  }
}

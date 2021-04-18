import { RegisterCity } from '../../../../domain/usecases/city/register-city';
import { missingParamError } from '../../../helpers/httpHelper';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';

export class RegisterCityController implements Controller {
  private readonly registerCity: RegisterCity;

  constructor(registerCity: RegisterCity) {
    this.registerCity = registerCity;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body: registerCityData } = httpRequest;

      const requiredParams = ['name', 'state'];

      for (const param of requiredParams) {
        if (!registerCityData[param]) {
          return missingParamError(param);
        }
      }

      const newCity = await this.registerCity.register(registerCityData);
      return {
        statusCode: 201,
        body: newCity,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: 'Internal server error' },
      };
    }
  }
}

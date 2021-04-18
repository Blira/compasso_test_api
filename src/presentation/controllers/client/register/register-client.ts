import { RegisterClient } from '../../../../domain/usecases/client/register-client';
import { missingParamError } from '../../../helpers/httpHelper';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';

export class RegisterClientController implements Controller {
  private readonly registerClient: RegisterClient;

  constructor(registerClient: RegisterClient) {
    this.registerClient = registerClient;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body: registerClientData } = httpRequest;

      const requiredParams = ['name', 'sex', 'birthDate', 'age', 'city_id'];

      for (const param of requiredParams) {
        if (!registerClientData[param]) {
          return missingParamError(param);
        }
      }

      const newClient = await this.registerClient.register(registerClientData);
      return {
        statusCode: 201,
        body: newClient,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: 'Internal server error' },
      };
    }
  }
}

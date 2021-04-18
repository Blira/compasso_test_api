import { UpdateClient } from '../../../../domain/usecases/client/update-client';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';

export class UpdateClientController implements Controller {
  private readonly updateClient: UpdateClient;

  constructor(updateClient: UpdateClient) {
    this.updateClient = updateClient;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        params: { id },
        body: { name },
      } = httpRequest;
      const updatedClient = await this.updateClient.update({ id, name });
      return {
        statusCode: 200,
        body: updatedClient,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: 'Internal server error' },
      };
    }
  }
}

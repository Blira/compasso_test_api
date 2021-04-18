import { RemoveClient } from '../../../../domain/usecases/client/remove-client';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';

export class RemoveClientController implements Controller {
  private readonly removeClient: RemoveClient;

  constructor(removeClient: RemoveClient) {
    this.removeClient = removeClient;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        params: { id },
      } = httpRequest;
      await this.removeClient.remove(id);
      return {
        statusCode: 204,
        body: {},
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: 'Internal server error' },
      };
    }
  }
}

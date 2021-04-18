import { RemoveClient } from '../../../../domain/usecases/client/remove-client';
import { noContent, serverError } from '../../../helpers/httpHelper';
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
        params: { client_id },
      } = httpRequest;
      await this.removeClient.remove(client_id);
      return noContent();
    } catch (error) {
      return serverError();
    }
  }
}

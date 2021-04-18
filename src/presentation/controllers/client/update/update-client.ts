import { UpdateClient } from '../../../../domain/usecases/client/update-client';
import { ok, serverError } from '../../../helpers/httpHelper';
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
      return ok(updatedClient);
    } catch (error) {
      return serverError();
    }
  }
}

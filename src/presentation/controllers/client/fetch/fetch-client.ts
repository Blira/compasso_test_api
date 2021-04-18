import {
  FetchClient,
  FetchClientFilter,
} from '../../../../domain/usecases/client/fetch-client';
import { Controller } from '../../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../../protocols/http';

export class FetchClientController implements Controller {
  private readonly fetchClient: FetchClient;

  constructor(fetchClient: FetchClient) {
    this.fetchClient = fetchClient;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { query: filter }: { query?: FetchClientFilter } = httpRequest;

      const clients = await this.fetchClient.fetch(filter);
      return {
        statusCode: 200,
        body: clients,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: 'Internal server error' },
      };
    }
  }
}

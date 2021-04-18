import { ClientModel } from '../../../../domain/models/client';
import {
  FetchClient,
  FetchClientFilter,
} from '../../../../domain/usecases/client/fetch-client';
import { HttpRequest } from '../../../protocols/http';
import { FetchClientController } from './fetch-client';

const createFetchClient = (): FetchClient => {
  class FetchClientStub implements FetchClient {
    async fetch(fetchClientFilter: FetchClientFilter): Promise<ClientModel[]> {
      return await new Promise(resolve =>
        resolve([
          {
            id: 'valid_id',
            name: 'valid_name',
            sex: 'M',
            birthDate: new Date('10-10-1998'),
            age: 23,
            city_id: 'city_id',
          },
        ]),
      );
    }
  }
  return new FetchClientStub();
};

interface SutType {
  sut: FetchClientController;
  fetchClientStub: FetchClient;
}
const createSut = (): SutType => {
  const fetchClientStub = createFetchClient();
  return {
    sut: new FetchClientController(fetchClientStub),
    fetchClientStub,
  };
};

describe('FetchClientController', () => {
  it('Should return 200 on success', async () => {
    const { sut } = createSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse.statusCode).toBe(200);
  });

  it('Should return the return of fetchClientStub on success', async () => {
    const { sut, fetchClientStub } = createSut();

    jest.spyOn(fetchClientStub, 'fetch').mockReturnValueOnce(
      new Promise(resolve =>
        resolve([
          {
            id: 'valid_id',
            name: 'valid_name',
            sex: 'M',
            birthDate: new Date('10-10-1998'),
            age: 23,
            city_id: 'city_id',
          },
        ]),
      ),
    );

    const httpResponse = await sut.handle({});
    expect(JSON.stringify(httpResponse.body)).toBe(
      JSON.stringify([
        {
          id: 'valid_id',
          name: 'valid_name',
          sex: 'M',
          birthDate: new Date('10-10-1998'),
          age: 23,
          city_id: 'city_id',
        },
      ]),
    );
  });

  it('Should call fetchClientStub.fetch() with correct values', async () => {
    const { sut, fetchClientStub } = createSut();

    const spyFetch = jest.spyOn(fetchClientStub, 'fetch');

    const httpRequest: HttpRequest = {
      query: {
        name: 'valid_name',
        city_id: 'valid_city_id',
        sex: 'M',
      },
    };
    await sut.handle(httpRequest);
    expect(spyFetch).toHaveBeenCalledWith(httpRequest.query);
  });

  it('Should throw if FetchClient throws', async () => {
    const { sut, fetchClientStub } = createSut();

    jest
      .spyOn(fetchClientStub, 'fetch')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const httpResponse = await sut.handle({});
    expect(httpResponse.statusCode).toBe(500);
  });
});

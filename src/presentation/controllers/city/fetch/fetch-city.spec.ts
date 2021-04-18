import { CityModel } from '../../../../domain/models/city';
import { ClientModel } from '../../../../domain/models/client';
import {
  FetchCity,
  FetchCityFilter,
} from '../../../../domain/usecases/city/fetch-city';
import {
  RegisterCity,
  RegisterCityModel,
} from '../../../../domain/usecases/city/register-city';
import { RegisterClient } from '../../../../domain/usecases/client/register-client';
import { HttpRequest } from '../../../protocols/http';
import { FetchCityController } from './fetch-city';

const createFetchCity = (): FetchCity => {
  class FetchCityStub implements FetchCity {
    async fetch(fetchCityFilter: FetchCityFilter): Promise<CityModel[]> {
      return await new Promise(resolve =>
        resolve([
          {
            id: 'valid_id',
            name: 'valid_name',
            state: 'valid_state',
          },
        ]),
      );
    }
  }
  return new FetchCityStub();
};

interface SutType {
  sut: FetchCityController;
  fetchCityStub: FetchCity;
}
const createSut = (): SutType => {
  const fetchCityStub = createFetchCity();
  return {
    sut: new FetchCityController(fetchCityStub),
    fetchCityStub,
  };
};

describe('FetchCityController', () => {
  it('Should return 200 on success', async () => {
    const { sut } = createSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse.statusCode).toBe(200);
  });

  it('Should return the return of fetchCityStub on success', async () => {
    const { sut, fetchCityStub } = createSut();

    jest
      .spyOn(fetchCityStub, 'fetch')
      .mockReturnValueOnce(
        new Promise(resolve =>
          resolve([
            { id: 'valid_id', name: 'valid_name', state: 'valid_state' },
          ]),
        ),
      );

    const httpResponse = await sut.handle({});
    expect(JSON.stringify(httpResponse.body)).toBe(
      JSON.stringify([
        { id: 'valid_id', name: 'valid_name', state: 'valid_state' },
      ]),
    );
  });

  it('Should call fetchCityStub.fetch() with correct values', async () => {
    const { sut, fetchCityStub } = createSut();

    const spyFetch = jest.spyOn(fetchCityStub, 'fetch');

    const httpRequest: HttpRequest = {
      query: {
        name: 'valid_name',
        state: 'PE',
      },
    };
    await sut.handle(httpRequest);
    expect(spyFetch).toHaveBeenCalledWith(httpRequest.query);
  });

  it('Should throw if FetchCity throws', async () => {
    const { sut, fetchCityStub } = createSut();

    jest
      .spyOn(fetchCityStub, 'fetch')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const httpResponse = await sut.handle({});
    expect(httpResponse.statusCode).toBe(500);
  });
});

import { ClientModel } from '../../../../domain/models/client';
import {
  UpdateClient,
  UpdateClientData,
} from '../../../../domain/usecases/client/update-client';
import { HttpRequest } from '../../../protocols/http';
import { UpdateClientController } from './update-client';

const createUpdateClient = (): UpdateClient => {
  class UpdateClientStub implements UpdateClient {
    async update(updateClientData: UpdateClientData): Promise<ClientModel> {
      return await new Promise(resolve =>
        resolve({
          id: 'valid_id',
          age: 23,
          birthDate: new Date('10-10-1998'),
          name: 'valid_name',
          sex: 'M',
          city_id: 'valid_city_id',
        }),
      );
    }
  }
  return new UpdateClientStub();
};

interface SutType {
  sut: UpdateClientController;
  updateClientStub: UpdateClient;
}
const createSut = (): SutType => {
  const updateClientStub = createUpdateClient();
  return {
    sut: new UpdateClientController(updateClientStub),
    updateClientStub,
  };
};

describe('RemoveClientController', () => {
  it('Should return 200 on success', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      params: {
        id: 'updated_name',
      },
      body: {
        name: 'updated_name',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
  });

  it('Should call updateClientStub.update() with correct values', async () => {
    const { sut, updateClientStub } = createSut();

    const spyFetch = jest.spyOn(updateClientStub, 'update');

    const httpRequest: HttpRequest = {
      params: {
        id: 'updated_name',
      },
      body: {
        name: 'updated_name',
      },
    };
    await sut.handle(httpRequest);
    expect(spyFetch).toHaveBeenCalledWith({
      id: 'updated_name',
      name: 'updated_name',
    });
  });

  it('Should throw if UpdateClient throws', async () => {
    const { sut, updateClientStub } = createSut();

    jest
      .spyOn(updateClientStub, 'update')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const httpRequest: HttpRequest = {
      params: {
        id: 'updated_name',
      },
      body: {
        name: 'updated_name',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
});

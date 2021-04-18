import { RemoveClient } from '../../../../domain/usecases/client/remove-client';
import { HttpRequest } from '../../../protocols/http';
import { RemoveClientController } from './remove-client';

const createRemoveClient = (): RemoveClient => {
  class RemoveClientStub implements RemoveClient {
    async remove(client_id: string): Promise<void> {}
  }
  return new RemoveClientStub();
};

interface SutType {
  sut: RemoveClientController;
  removeClientStub: RemoveClient;
}
const createSut = (): SutType => {
  const removeClientStub = createRemoveClient();
  return {
    sut: new RemoveClientController(removeClientStub),
    removeClientStub,
  };
};

describe('RemoveClientController', () => {
  it('Should return 204 on success', async () => {
    const { sut } = createSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse.statusCode).toBe(204);
  });

  it('Should call removeClientStub.remove() with correct values', async () => {
    const { sut, removeClientStub } = createSut();

    const spyFetch = jest.spyOn(removeClientStub, 'remove');

    const httpRequest: HttpRequest = {
      params: {
        client_id: 'valid_client_id',
      },
    };
    await sut.handle(httpRequest);
    expect(spyFetch).toHaveBeenCalledWith(httpRequest.query.client_id);
  });

  it('Should throw if RemoveClient throws', async () => {
    const { sut, removeClientStub } = createSut();

    jest
      .spyOn(removeClientStub, 'remove')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const httpResponse = await sut.handle({});
    expect(httpResponse.statusCode).toBe(500);
  });
});

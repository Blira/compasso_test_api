import { ClientModel } from '../../../../domain/models/client';
import {
  RegisterClient,
  RegisterClientModel,
} from '../../../../domain/usecases/client/register-client';
import { HttpRequest } from '../../../protocols/http';
import { RegisterClientController } from './register-client';

const createRegisterClient = (): RegisterClient => {
  class RegisterClientStub implements RegisterClient {
    async register(
      registerClientData: RegisterClientModel,
    ): Promise<ClientModel> {
      return await new Promise(resolve =>
        resolve({
          id: 'valid_id',
          ...registerClientData,
        }),
      );
    }
  }
  return new RegisterClientStub();
};

interface SutType {
  sut: RegisterClientController;
  registerClientStub: RegisterClient;
}
const createSut = (): SutType => {
  const registerClientStub = createRegisterClient();
  return {
    sut: new RegisterClientController(registerClientStub),
    registerClientStub,
  };
};

describe('RegisterClientController', () => {
  it('Should return 200 on success', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      body: {
        name: 'valid_name',
        sex: 'M',
        birthDate: '10-10-1998',
        age: 23,
        city: 'city_id',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
  });

  it('Should call registerClient.register() with correct values', async () => {
    const { sut, registerClientStub } = createSut();

    const spyRegister = jest.spyOn(registerClientStub, 'register');

    const httpRequest: HttpRequest = {
      body: {
        name: 'valid_name',
        sex: 'M',
        birthDate: '10-10-1998',
        age: 23,
        city: 'city_id',
      },
    };
    await sut.handle(httpRequest);
    expect(spyRegister).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if name is not provided', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      body: {
        sex: 'M',
        birthDate: '10-10-1998',
        age: 23,
        city: 'city_id',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it('Should return 400 if sex is not provided', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      body: {
        name: 'valid_name',
        birthDate: '10-10-1998',
        age: 23,
        city: 'city_id',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it('Should return 400 if birthDate is not provided', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      body: {
        name: 'valid_name',
        sex: 'M',
        age: 23,
        city: 'city_id',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it('Should return 400 if age is not provided', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      body: {
        name: 'valid_name',
        sex: 'M',
        birthDate: '10-10-1998',
        city: 'city_id',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it('Should return 400 if city is not provided', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      body: {
        name: 'valid_name',
        sex: 'M',
        birthDate: '10-10-1998',
        age: 23,
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});

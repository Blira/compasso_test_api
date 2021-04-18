import { CityModel } from '../../../../domain/models/city';
import { ClientModel } from '../../../../domain/models/client';
import {
  RegisterCity,
  RegisterCityModel,
} from '../../../../domain/usecases/city/register-city';
import { RegisterClient } from '../../../../domain/usecases/client/register-client';
import { HttpRequest } from '../../../protocols/http';
import { RegisterCityController } from './register-city';

const createRegisterCity = (): RegisterCity => {
  class RegisterCityStub implements RegisterCity {
    async register(registerCityData: RegisterCityModel): Promise<CityModel> {
      return await new Promise(resolve =>
        resolve({
          id: 'valid_id',
          ...registerCityData,
        }),
      );
    }
  }
  return new RegisterCityStub();
};

interface SutType {
  sut: RegisterCityController;
  registerCityStub: RegisterCity;
}
const createSut = (): SutType => {
  const registerCityStub = createRegisterCity();
  return {
    sut: new RegisterCityController(registerCityStub),
    registerCityStub,
  };
};

describe('RegisterCityController', () => {
  it('Should return 201 on success', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      body: {
        name: 'valid_name',
        state: 'PE',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
  });

  it('Should return registered city on success', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      body: {
        name: 'valid_name',
        state: 'PE',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
    // expect(httpResponse.body.id).toBeTruthy();
    expect(httpResponse.body.name).toBe('valid_name');
    expect(httpResponse.body.state).toBe('PE');
  });

  it('Should call registerCity.register() with correct values', async () => {
    const { sut, registerCityStub } = createSut();

    const spyRegister = jest.spyOn(registerCityStub, 'register');

    const httpRequest: HttpRequest = {
      body: {
        name: 'valid_name',
        state: 'PE',
      },
    };
    await sut.handle(httpRequest);
    expect(spyRegister).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if name is not provided', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      body: {
        state: 'PE',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it('Should return 400 if state is not provided', async () => {
    const { sut } = createSut();

    const httpRequest: HttpRequest = {
      body: {
        state: 'PE',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  it('Should throw if RegisterCity throws', async () => {
    const { sut, registerCityStub } = createSut();

    jest
      .spyOn(registerCityStub, 'register')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const httpRequest: HttpRequest = {
      body: {
        name: 'valid_name',
        state: 'PE',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
  });
});

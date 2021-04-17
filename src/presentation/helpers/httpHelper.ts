import { InvalidParamError } from '../errors/invalidParamError';
import { MissingParamError } from '../errors/missingParamError';
import { ServerError } from '../errors/serverError';
import { HttpResponse } from '../protocols/http';

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: {},
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const missingParamError = (param: string): HttpResponse => ({
  statusCode: 400,
  body: new MissingParamError(param),
});

export const invalidParamError = (param: string): HttpResponse => ({
  statusCode: 400,
  body: new InvalidParamError(param),
});

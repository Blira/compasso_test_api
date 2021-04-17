export class MissingParamError extends Error {
  constructor(param: string) {
    super(`Missing parameter ${param}`);
    this.name = 'MissingParamError';
  }
}

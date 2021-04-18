import { Router } from 'express';
import { adaptRoute } from '../../../adapters/express-route-adapter';
import { createRegisterCityController } from '../../../factories/city';

export default (router: Router): void => {
  router.post('/cities', adaptRoute(createRegisterCityController()));
};

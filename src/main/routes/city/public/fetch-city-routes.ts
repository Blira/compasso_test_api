import { Router } from 'express';
import { adaptRoute } from '../../../adapters/express-route-adapter';
import { createFetchCityController } from '../../../factories/city';

export default (router: Router): void => {
  router.get('/cities', adaptRoute(createFetchCityController()));
};

import { Router } from 'express';
import { adaptRoute } from '../../../adapters/express-route-adapter';
import { createFetchClientController } from '../../../factories/client';

export default (router: Router): void => {
  router.get('/clients', adaptRoute(createFetchClientController()));
};

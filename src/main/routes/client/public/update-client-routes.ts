import { Router } from 'express';
import { adaptRoute } from '../../../adapters/express-route-adapter';
import { createUpdateClientController } from '../../../factories/client';

export default (router: Router): void => {
  router.put('/clients/:id', adaptRoute(createUpdateClientController()));
};

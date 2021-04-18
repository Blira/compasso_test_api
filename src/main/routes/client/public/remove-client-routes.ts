import { Router } from 'express';
import { adaptRoute } from '../../../adapters/express-route-adapter';
import { createRemoveClientController } from '../../../factories/client';

export default (router: Router): void => {
  router.delete('/clients/:id', adaptRoute(createRemoveClientController()));
};

import { Router } from 'express';
import { adaptRoute } from '../../../adapters/express-route-adapter';
import { createRegisterClientControlller } from '../../../factories/client';

export default (router: Router): void => {
  router.post('/clients', adaptRoute(createRegisterClientControlller()));
};

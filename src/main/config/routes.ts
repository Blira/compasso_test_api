import { Express, Router } from 'express';
import fg from 'fast-glob';

export function setupPublicRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);
  fg.sync('**/src/main/routes/**/public/**routes.ts').map(async file => {
    const route = (await import(`../../../${file}`)).default;
    route(router);
  });
}

export function setupPrivateRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);
  fg.sync('**/src/main/routes/**/private/**routes.ts').map(async file => {
    const route = (await import(`../../../${file}`)).default;
    route(router);
  });
}

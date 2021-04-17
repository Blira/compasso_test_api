import { Express } from 'express';
import { cors, contentType } from '../middlewares';

export function setupMiddlewares(app: Express): void {
  app.use(cors);
  app.use(contentType);
}

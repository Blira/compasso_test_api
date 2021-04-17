import { Express, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

export function setupDocumentation(app: Express): void {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'text/html');
      next();
    },
    swaggerUi.setup(swaggerFile),
  );
}

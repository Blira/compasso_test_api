import express from 'express';
import { bodyParser } from '../middlewares';
import { setupDocumentation } from './documentation/setupDocumentation';
import { setupMiddlewares } from './middlewares';
import { setupPrivateRoutes, setupPublicRoutes } from './routes';

const app = express();

app.use(bodyParser);
setupDocumentation(app);
setupPublicRoutes(app);
setupMiddlewares(app);
setupPrivateRoutes(app);

export default app;

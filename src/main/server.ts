import 'dotenv/config';
import env from './config/env';
import { DatabaseConnection } from './instances-container';

DatabaseConnection.connect()
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`),
    );
  })
  .catch(e => console.error(e));

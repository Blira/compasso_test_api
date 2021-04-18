import { DbFetchClient } from '../../data/usecases/client/fetch-client/db-fetch-client';
import { DbRegisterClient } from '../../data/usecases/client/register-client/db-register-client';
import { FetchClientFilter } from '../../domain/usecases/client/fetch-client';
import { PostgresClientRepository } from '../../infra/db/postgres/repositories/client/client-repository';
import { FetchClientController } from '../../presentation/controllers/client/fetch/fetch-client';
import { RegisterClientController } from '../../presentation/controllers/client/register/register-client';

export const createRegisterClientControlller = (): RegisterClientController => {
  const clientRepository = new PostgresClientRepository();
  const registerClient = new DbRegisterClient(clientRepository);
  return new RegisterClientController(registerClient);
};

export const createFetchClientController = (): FetchClientController => {
  const clientRepository = new PostgresClientRepository();
  const fetchClient = new DbFetchClient(clientRepository);
  return new FetchClientController(fetchClient);
};

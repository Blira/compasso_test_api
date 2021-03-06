import { DbFetchClient } from '../../data/usecases/client/fetch-client/db-fetch-client';
import { DbRegisterClient } from '../../data/usecases/client/register-client/db-register-client';
import { DbRemoveClient } from '../../data/usecases/client/remove-client/db-remove-client';
import { DbUpdateClient } from '../../data/usecases/client/update-client/db-update-client';
import { PostgresClientRepository } from '../../infra/db/postgres/repositories/client/client-repository';
import { FetchClientController } from '../../presentation/controllers/client/fetch/fetch-client';
import { RegisterClientController } from '../../presentation/controllers/client/register/register-client';
import { RemoveClientController } from '../../presentation/controllers/client/remove/remove-client';
import { UpdateClientController } from '../../presentation/controllers/client/update/update-client';

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

export const createRemoveClientController = (): RemoveClientController => {
  const clientRepository = new PostgresClientRepository();
  const removeClient = new DbRemoveClient(clientRepository);
  return new RemoveClientController(removeClient);
};

export const createUpdateClientController = (): UpdateClientController => {
  const clientRepository = new PostgresClientRepository();
  const updateClient = new DbUpdateClient(clientRepository);
  return new UpdateClientController(updateClient);
};

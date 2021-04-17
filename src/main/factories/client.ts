import { DbRegisterClient } from '../../data/usecases/client/register-client/db-register-client';
import { PostgresClientRepository } from '../../infra/db/postgres/repositories/client/client-repository';
import { RegisterClientController } from '../../presentation/controllers/client/register/register-client';

export const createRegisterClientControlller = (): RegisterClientController => {
  const clientRepository = new PostgresClientRepository();
  const registerClient = new DbRegisterClient(clientRepository);
  return new RegisterClientController(registerClient);
};

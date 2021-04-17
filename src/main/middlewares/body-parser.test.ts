import request from 'supertest';
import { UserEntity } from '../../infra/db/postgres/entities/user';
import app from '../config/app';
import { DatabaseConnection } from '../instances-container';

let token: string;
beforeAll(async () => {
  await DatabaseConnection.connect('test');
  await request(app).post('/api/users').send({
    name: 'another_valid_name',
    email: 'another_valid@email.com',
    isAdmin: false,
    active: true,
    password: 'another_valid_pass',
    passwordConfirmation: 'another_valid_pass',
  });
  const { body: loginBody } = await request(app).post('/api/login').send({
    email: 'another_valid@email.com',
    password: 'another_valid_pass',
  });
  token = loginBody.token;
});

afterAll(async () => {
  const usersTable = await DatabaseConnection.getRepository<UserEntity>(
    'users',
  );
  await usersTable.delete({});
  await DatabaseConnection.disconnect();
});

describe('Body Parser Middleware', () => {
  it('Should parse body as JSON', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_body_parser')
      .set('Authorization', `bearer ${token}`)
      .send({ name: 'valid_name' })
      .expect({ name: 'valid_name' });
  });
});

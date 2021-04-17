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

describe('Content Type Middleware', () => {
  it('Should return default content type as JSON', async () => {
    app.get('/test_content_type_json', (req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_content_type_json')
      .set('Authorization', `bearer ${token}`)
      .expect('content-type', /json/);
  });

  it('Should return XML content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml');
      res.send();
    });
    await request(app)
      .get('/test_content_type_xml')
      .set('Authorization', `bearer ${token}`)
      .expect('content-type', /xml/);
  });
});

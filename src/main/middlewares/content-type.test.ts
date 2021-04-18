import request from 'supertest';
import app from '../config/app';
import { DatabaseConnection } from '../instances-container';
describe('Content Type Middleware', () => {
  it('Should return default content type as JSON', async () => {
    app.get('/test_content_type_json', (req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_content_type_json')
      .expect('content-type', /json/);
  });

  it('Should return XML content type when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml');
      res.send();
    });
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/);
  });
});

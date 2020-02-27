const req = require('supertest');
const db = require('../data/db-config.js');
const server = require('./server.js');

describe('the server', () => {

  beforeEach(async () => {
    await db('users').truncate();
  });

  // for endpoint ending with '/'
  describe('GET /', () => {
    it('should send back the right status code and object', async () => {
      const res = await req(server).get('/');
      expect(res.status).toBe(200);
      // expect(res.type).toBe('application/json');
      expect(res.type).toMatch(/json/i);
      expect(res.body).toEqual({ message: `It's working` });
    });
  });

  //for endpoint ending with '/users'
  describe('GET /users', () => {
    it('should send back a list of users', async () => {
      const res = await req(server).get('/users');
      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      // expect(res.type).toMatch(/json/i);
      expect(res.body.length).toBe(0);
    });
  });
})
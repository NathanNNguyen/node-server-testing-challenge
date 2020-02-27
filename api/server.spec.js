const req = require('supertest');
const db = require('../data/db-config.js');
const server = require('./server.js');
const Users = require('../users/users-model.js');

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
  describe('GET /api/users', () => {
    it('should send back a list of users', async () => {
      const res = await req(server).get('/api/users');
      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      // expect(res.type).toMatch(/json/i);
      expect(res.body.length).toBe(0);
    });
  });

  describe('POST /api/users', () => {
    it('should add a new user', async () => {
      // set up
      const res = await req(server).post('/api/users');
      const user = { id: 1, name: 'testing' };
      const inserted = await Users.add(user);

      // assertion
      expect(inserted).toEqual(user);
      expect(res.type).toMatch(/json/);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should remove a user by id', async () => {
      // set up
      const res = await req(server).del('/api/users/:id');
      const user = { id: 1, name: 'testing' };
      const removed = await Users.remove(user.id)

      // assertion
      expect(removed).toBe(0);
      expect(res.status).toBe(200);
    })
  })

});
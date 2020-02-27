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
      return req(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200)
          expect(res.type).toBe('application/json')
          expect(res.body).toEqual({ message: `It's working` })
        });
    });
  });

  //for endpoint ending with '/users'
  describe('GET /users', () => {
    it('should send back a list of users', async () => {
      return req(server)
        .get('/users')
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.type).toBe('application/json');
          expect(res.body.length).toBe(0)
        })
    })
  })
});
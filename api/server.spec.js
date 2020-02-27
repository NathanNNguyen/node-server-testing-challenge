const req = require('supertest');

const server = require('./server.js');

describe('the server', () => {
  describe('GET /', () => {

    it('should send back the right status code', async () => {
      return req(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200)
        });
    });

    it('should give back the right object', async () => {
      return req(server)
        .get('/')
        .then(res => {
          expect(res.type).toBe('application/json')
          expect(res.body).toEqual({ message: `It's working` })
        })
    })
  });
});
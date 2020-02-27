const req = require('supertest');
const Users = require('./users-model.js');
const db = require('../data/db-config.js');

describe('Testing the users model', () => {

  // need a clean up function after testing
  // other wise db would change every time
  beforeEach(async () => {
    await db('users').truncate();
  });

  describe('Testing the add function', () => {

    it('should insert a new user', async () => {
      // set up
      const userData = { name: 'nathan' };
      await Users.add(userData);

      // ASSERTION
      // use the db in case helper function breaks
      const users = await db('users');
      expect(users.length).toBe(1);
      expect(users[0].name).toBe('nathan');
    });

    it('should show the inserted user', async () => {
      // set up
      const userData = { name: 'nathan' };
      const user = await Users.add(userData);

      // ASSERTION
      expect(user).toEqual({ id: 1, name: 'nathan' });
    })
  });

  describe('Testing the remove function', () => {

    it('should remove a user', async () => {
      // set up 
      const users = await db('users');
      const userData = { id: 1, name: 'nathan' };
      await Users.remove(userData.id);

      // ASSERTION
      expect(users.length).toBe(0);
      expect(users[0]).toBe(undefined);
    });
  });
})
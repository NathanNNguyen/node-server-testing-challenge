const db = require('../data/db-config.js');

module.exports = {
  add,
  remove,
  getAll,
  findById
}


async function add(userData) {
  return db('users').insert(userData)

    .then(arr => {
      return findById(arr[0])
    })

  // .then(ids => {
  //   return db('users').where({id: ids[0]}).first()
  // })
};

async function remove(id) {
  return db('users').del(id)
};

async function getAll() {
  return db('users');
};

async function findById(id) {
  return db('users').where({ id }).first();
};
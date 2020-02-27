const express = require('express');
const db = require('../users/users-model.js');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({ message: `It's working` })
});

server.get('/users', async (req, res) => {
  const users = await db.getAll()
  try {
    res.status(200).json(users)
  }
  catch (err) {
    res.status(500).json({ message: 'Error while getting users' })
  }
})

module.exports = server;
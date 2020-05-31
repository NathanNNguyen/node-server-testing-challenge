const express = require('express');
const userRouter = require('../users/users-router.js');

const server = express();

server.use(express.json()); // NEED THIS FOR PUT AND POST

server.get('/', (req, res) => {
  res.status(200).json({ message: `It's working` })
});

server.use('/api/users', userRouter);

module.exports = server;
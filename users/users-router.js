const express = require('express')

const Users = require('./users-model.js');

const router = express();

router.get('/', async (req, res) => {
  const users = await Users.getAll();
  try {
    res.status(200).json(users);
  }
  catch (err) {
    res.status(500).json({ message: 'Error while getting users', err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    res.status(200).json(user)
  }
  catch (err) {
    res.status(500).json({ message: 'Error while getting user', err })
  }
})

router.post('/', async (req, res) => {
  try {
    const userData = req.body;
    const inserted = await Users.add(userData);
    res.status(200).json(inserted);
  }
  catch (err) {
    res.status(500).json({ err: err.message })
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Users.remove(id);
    res.status(200).json(removed)
  }
  catch (err) {
    res.status(500).json({ message: 'Error while deleting user', err })
  }
})

module.exports = router;
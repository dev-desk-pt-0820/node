const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./users-model.js');

router.get("/", (req, res) => {
    Users.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.send(err));
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      if (!user) return next({
            code: 404,
            message: 'User not found.'
      });
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: 'There was a problem getting the user.'
      })
    });
});

router.put('/:id', (req, res, next) => {

  const id = req.params.id;
  const { name, username, password, roles } = req.body;

  if (password) var hash = bcrypt.hashSync(password, 8);

  const changes = { name, username, password: hash, roles };

  Users.update(id, changes)
    .then((user) => res.json({ user, changes }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: 'There was a problem updating the user.'
      })
    });
});

module.exports = router;
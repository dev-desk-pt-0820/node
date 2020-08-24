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
      next({
            code: 500,
            message: 'There was a problem getting the user.'
      });
    });
});

router.put('/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const { name, username, password, roles } = req.body;

  if (id !== req.jwt.id)
    return next({
        code: 403,
        message: 'You cannot update a profile that is not yours.'
    });

  if (!roles.every((role) => ['STUDENT', 'HELPER'].includes(role)))
    return next({
        code: 400,
        message: 'Please provide a valid role.',
    });

  if (password) var hash = bcrypt.hashSync(password, 8);

  const changes = { name, username, password: hash, roles };

  Users.update(id, changes)
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      next({
        code: 500,
        message: 'There was a problem updating the user.'
      });
    });
});

module.exports = router;
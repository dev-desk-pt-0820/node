const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('password', 8);

exports.seed = function (knex) {
  return knex('users').insert([
    {
      id: 1,
      name: 'userOne',
      username: 'annaOne',
      password: hash,
    },
    {
      id: 2,
      name: 'userTwo',
      username: 'annaTwo',
      password: hash,
    },
    {
      id: 3,
      name: 'userThree',
      username: 'annaOneTwoThreeFour',
      password: hash,
    },
  ]);
};
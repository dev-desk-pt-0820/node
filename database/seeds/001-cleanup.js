const cleaner = require('knex-cleaner');

exports.seed = function (knex) {
  return cleaner
    .clean(knex, {
      mode: 'truncate',
      restartIdentity: true, // asks PostgreSQL to reset the Primary keys back to 0
      ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    })
    .then(() => console.log('\n== All tables truncated, readty to seed ==\n'));
};
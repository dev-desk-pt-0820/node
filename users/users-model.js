const db = require('../database/dbConfig.js');
const knexfile = require('../knexfile.js');

function find() {
    return db('users')
        .select('id', 'name', 'username')
        .orderBy('id');
};

function findBy(filter) {
    return db('users')
        .where(filter)
        .orderBy('id');
};

async function findById(id) {
    const user = await db('users')
      .where({ id })
      .select('id', 'name', 'username', 'email')
      .first();
    if (!user) return;
    user.roles = await db('roles').pluck('role').where({ user_id: id });
    return user;
  }

async function add(user) {
    const { name, username, password, roles } = user;
    return db
      .transaction(async (trx) => {
        const [id] = await trx('users').insert({ name, username, password }, 'id');
        const rol = roles.map((role) => ({
          user_id: id,
          role,
        }));
        await trx.batchInsert('roles', rol);
        return id;
      })
      .then((id) => findById(id));
};

function update(userId, changes) {
    const { name, username, password, roles } = changes;
    return db
      .transaction(async (trx) => {
        if (name || username || password) {
          await trx('users')
            .where({ id: userID })
            .update({ name, username, password }, 'id');
        }
        if (roles) {
          await trx('roles').where({ user_id: userID }).del();
          const rol = roles.map((role) => ({
            user_id: userID,
            role,
          }));
          await trx.batchInsert('roles', rol);
        }
  
        return userID;
      })
      .then((id) => findById(id));
};

function deleteUser(id) {
    return knex('users').where({ id }).delete();
};

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    deleteUser
};
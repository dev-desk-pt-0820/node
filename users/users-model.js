const db = require('../database/dbConfig.js');

function find() {
  return db('users')
    .select('id', 'name', 'username', 'password')
    .orderBy('id');
};

function findBy(filter) {
  return db('users')
    .where(filter)
    .orderBy('id');
};

async function findOneBy(filter) {
  const user = await db('users')
    .where(filter)
    .first();
  if (!user) return;
  user.roles = await db('roles')
    .pluck('role')
    .where({ user_id: user.id });
  return user;
};

async function add(user) {
  const { name, username, password, roles } = user;
  return db
    .transaction(async (trx) => {
      const [id] = await trx('users')
        .insert({ name, username, password }, 'id');
      const rol = roles.map((role) => ({
        user_id: id,
        role,
      }));
      await trx.batchInsert('roles', rol);
      return id;
    })
    .then((id) => findById(id));
};

function update(userID, changes) {
  const { name, username, password, roles } = changes;
  return db
    .transaction(async (trx) => {
      if (name || username || password) {
        await trx('users')
          .where({ id: userID })
          .update({ name, username, password }, 'id');
      }
      if (roles) {
        await trx('roles')
            .where({ user_id: userID })
            .del();
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

async function findById(id) {
  const user = await db('users')
    .where({ id })
    .select('id', 'name', 'username')
    .first();
  if (!user) return;
  user.roles = await db('roles')
    .pluck('role')
    .where({ user_id: id });
  return user;
};

function getNameByID(id) {
  return db('users')
    .where({ id })
    .select('name')
    .first();
};

module.exports = {
    add,
    find,
    findBy,
    findOneBy,
    findById,
    getNameByID,
    update,
};
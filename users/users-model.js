const db = require('../database/dbConfig.js');

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

async function add(user) {
    const { name, email, password, roles } = user;
    try {
      const [id] = await db('users').insert({ name, email, password, roles }, 'id');
  
      return findById(id);
    } catch (error) {
      throw error;
    };
};

function update(userId, changes) {
    const { name, username, password, roles } = changes;
    return
};

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    delete
};
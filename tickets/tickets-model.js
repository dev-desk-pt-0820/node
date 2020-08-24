const db = require('../database/dbConfig.js');

function find() {
    return db('tickets as t')
        .join('users as u', 'u.id', 't.posted_by')
        .leftJoin('users as usr', 'usr.id', 't.claimed_by')
        .select(
            't.id as ticket_id',
            'u.id as posted_by_id',
            'u.name as posted_by_name',
            't.posted_at',
            't.status',
            't.title',
            't.description',
            't.what_i_tried',
            'usr.id as claimed_by_id',
            'usr.name as claimed_by_name'
        )
        .orderBy('t.id');
};

function findById(ticketId) {
    return db('tickets as t')
        .join('users as u', 'u.id', 't.posted_by')
        .leftJoin('users as usr', 'usr.id', 't.claimed_by')
        .select(
            't.id as ticket_id',
            'u.id as posted_by_id',
            'u.name as posted_by_name',
            't.posted_at',
            't.status',
            't.title',
            't.description',
            't.what_i_tried',
            'usr.id as claimed_by_id',
            'usr.name as claimed_by_name'
        )
        .where({
            't.id': ticketId,
        })
        .first();
};

function findComments(ticketId) {
    return db('tickets as t')
        .join('users as u', 'u.id', 't.posted_by')
        .leftJoin('users as usr', 'usr.id', 't.claimed_by')
        .leftJoin('comments', 'comments.ticket_id', 't.id')
        .select(
            't.id as ticket_id',
            'u.id as posted_by_id',
            'u.name as posted_by_name',
            't.posted_at',
            't.status',
            't.title',
            't.description',
            't.what_i_tried',
            'usr.id as claimed_by_id',
            'usr.name as claimed_by_name',
            'comments.content',
            'comments.posted_by as comments_by',
            'comments.posted_at as comments_at'
        )
        .orderBy('t.id')
        .where({
            't.id': ticketId,
        });
};

function add(ticket, categories) {
    return db
      .transaction(function (trx) {
        return trx
          .insert(ticket, 'id')
          .into('tickets')
          .then(async function ([id]) {
            if (!categories) return id;
            const rol = categories.map((category) => ({
              ticket_id: id,
              category,
            }));
            await db.batchInsert('categories', rol).transacting(trx);
            return id;
          });
      })
      .then((id) => findById(id));
};

function update(ticket, categories, ticketID, userID) {
    return db
      .transaction(function (trx) {
        return db('tickets')
          .transacting(trx)
          .where({ id: ticketID, posted_by: userID })
          .update(ticket, 'id')
          .then(async function ([id]) {
            if (!categories) return id;
            await db('categories')
              .transacting(trx)
              .where({ ticket_id: id })
              .del();
            const rol = categories.map((category) => ({
              ticket_id: id,
              category,
            }));
            await db.batchInsert('categories', rol).transacting(trx);
            return id;
          });
      })
      .then((id) => findById(id));
}

function remove(ticketID, userID) {
    return db('tickets')
        .where({ id: ticketID, posted_by: userID })
        .delete();
};

module.exports = {
    find,
    findById,
    findComments,
    add,
    update,
    remove
};
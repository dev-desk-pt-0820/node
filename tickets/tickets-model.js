const db = require('../database/dbConfig.js');

function find() {
    return db('tickets')
        .join('users as u', 'u.id', 'tickets.posted_by')
        .leftJoin('users as usr', 'usr.id', 'tickets.claimed_by')
        .select(
            'tickets.id as ticket_id',
            'u.id as posted_by',
            'u.name as posted_by_name',
            'tickets.posted_at',
            'tickets.status',
            'tickets.title',
            'tickets.description',
            'tickets.what_i_tried',
            'usr.id as claimed_by_id',
            'usr.name as claimed_by_name'
        )
        .orderBy('tickets.id');
};

function findById(ticketId) {
    return db('tickets')
        .join('users as u', 'u.id', 'tickets.posted_by')
        .leftJoin('users as usr', 'usr.id', 'tickets.claimed_by')
        .select(
            'tickets.id as ticket_id',
            'u.id as posted_by',
            'u.name as posted_by_name',
            'tickets.posted_at',
            'tickets.status',
            'tickets.title',
            'tickets.description',
            'tickets.what_i_tried',
            'usr.id as claimed_by_id',
            'usr.name as claimed_by_name'
        )
        .where({
            'tickets.id': ticketId,
        })
        .first();
};

function findComments(ticketId) {
    return db('tickets')
        .join('users as u', 'u.id', 'tickets.posted_by')
        .leftJoin('users as usr', 'usr.id', 'tickets.claimed_by')
        .leftJoin('comments', 'comments.ticket_id', 'tickets.id')
        .select(
            'tickets.id as ticket_id',
            'u.id as posted_by',
            'u.name as posted_by_name',
            'tickets.posted_at',
            'tickets.status',
            'tickets.title',
            'tickets.description',
            'tickets.what_i_tried',
            'usr.id as claimed_by_id',
            'usr.name as claimed_by_name',
            'comments.content',
            'comments.posted_by as comments_by',
            'comments.posted_at as comments_at'
        )
        .orderBy('tickets.id')
        .where({
            'tickets.id': ticketId,
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

function update(ticket) {
  return db('tickets')
    .where({ posted_by: ticket.posted_by })
    .update(ticket)
}

function remove(ticketID) {
  return db('tickets')
      .where({ id: ticketID })
      .delete()
};

module.exports = {
    find,
    findById,
    findComments,
    add,
    update,
    remove
};
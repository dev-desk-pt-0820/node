exports.up = function (knex) {
return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.string('name').notNullable();
        tbl.string('username').notNullable().unique();
        tbl.string('password').notNullable();
    })
    .createTable('roles', tbl => {
        tbl
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        // tbl.string('role').notNullable().unique()
        tbl.enu('role', ['STUDENT', 'HELPER']).notNullable()
        tbl.primary(['user_id', 'role']);
    })
    .createTable('tickets', (tbl) => {
        tbl.increments();
        tbl
            .integer('posted_by')
            .unsigned()
            .notNullable()
            .references('id').inTable('users')
            .onDelete('CASCADE');            
        tbl
            .integer('claimed_by')
            .unsigned()
            .references('id').inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.timestamp('posted_at').defaultTo(knex.fn.now());
        tbl
            .enu('status', ['OPEN', 'CLOSED'])
            .notNullable()
            .defaultTo('OPEN');
        tbl.string('title').notNullable();
        tbl.string('description').notNullable();
        tbl.string('what_i_tried').notNullable();
    })
    .createTable('categories', (tbl) => {
        tbl
            .integer('ticket_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('tickets')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.string('category').notNullable();
        tbl.primary(['ticket_id', 'category']);
    })
    .createTable('comments', (tbl) => {
        tbl.increments();
        tbl
            .integer('posted_by')
            .unsigned()
            .notNullable()
            .references('id').inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.timestamp('posted_at').defaultTo(knex.fn.now());
        tbl
            .integer('ticket_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('tickets')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.text('content').notNullable();
    });
};

exports.down = function (knex) {
return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('categories')
    .dropTableIfExists('tickets')
    .dropTableIfExists('roles')
    .dropTableIfExists('users');
};
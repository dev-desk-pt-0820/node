exports.seed = function (knex) {
  return knex('categories')
    .insert([
      {
        ticket_id: 1,
        category: 'Lambda'
      },
      {
        ticket_id: 2,
        category: 'Troll Toll'
      },
      {
        ticket_id: 3,
        category: 'VS Code'
      },
      {
        ticket_id: 3,
        category: 'Computer Settings'
      },
      {
        ticket_id: 4,
        category: 'GitHub'
      },
      {
        ticket_id: 4,
        category: 'Git Flow'
      },
      {
        ticket_id: 5,
        category: 'Slack'
      },
    ]);
};
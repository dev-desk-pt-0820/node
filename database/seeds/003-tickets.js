exports.seed = function (knex) {
  return knex('tickets')
    .insert([
      {
        id: 1,
        posted_by: 1,        
        status: 'OPEN',
        title: 'Switching to FT from PT',
        description: 'Got hired with dream company, now I need to switch to the PT curriculum.',
        what_i_tried: 'Spoke with my TL.'
      },
      {
        id: 2,
        posted_by: 1,
        claimed_by: 1,
        status: 'OPEN',
        title: 'My computer was running fine.',
        description: 'But then I caught it.',
        what_i_tried: 'Ba Dum Tss.'
      },
      {
        id: 3,
        posted_by: 2,
        claimed_by: 1,
        status: 'OPEN',
        title: 'VS Code settings',
        description: 'My vs code isn\'t optimized for web dev. I need help deciding what plugins I need.',
        what_i_tried: 'Watching youtube.'
      },
      {
        id: 4,
        posted_by: 3,
        status: 'CLOSED',
        title: 'GitHub Merge Conflicts.',
        description: 'My repo has merge conflicts.',
        what_i_tried: 'Reading through github documentation.'
      },
      {
        id: 5,
        posted_by: 2,
        claimed_by: 1,
        status: 'CLOSED',
        title: 'Kicked from the Slack channel.',
        description: 'I\'m no longer able to access the Slack channel.',
        what_i_tried: 'Emailing my TL (I cannot message through Slack)'
      },
    ]);
};
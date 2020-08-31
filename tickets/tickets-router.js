
const express = require('express');
const router = express.Router();
const Tickets = require('./tickets-model.js');

router.get('/', async (req, res, next) => {
  if (Object.keys(req.query).length) {
    const filter = req.query;

    Tickets.findBy(filter)
      .then(tickets => res.json(tickets))
      .catch(err => {
        console.error(err);
        next({
            code: 500,
            message: 'Could not get tickets.'
        });
      });
  } else {
    Tickets.find()
      .then(tickets => res.json(tickets))
      .catch(err => {
        console.error(err);
        next({
            code: 500,
            message: 'Could not get tickets.'
        });
      });
  }
});

router.post('/', async (req, res, next) => {
    const userID = req.body.user_id;
    const { posted_by, title, description, what_i_tried, categories } = req.body;
  
    if (!(title && description))
      return next({
        code: 400,
        message: 'Please provide a title and description.',
      });
  
    try {
      const ticket = await Tickets.add(
        {
          posted_by,
          title,
          description,
          what_i_tried,
        },
        categories
      );
      res.status(201).json(ticket);
    } catch (err) {
      console.error(err);
      res.status(500).json({
          message: 'Could not create ticket.',
          err
      })
    }
});

router.put('/:id', async (req, res, next) => {

    const ticketID = req.params.id;
    const { title, description, what_i_tried, posted_by } = req.body;
  
    try {
      const ticket = { title, description, what_i_tried, posted_by };
      Tickets.findById(ticketID)
      .then(editedTicket => {
        if (editedTicket) {
          Tickets.update(
          ticket,
          )
          .then(newTicket => {
            res.status(201).json({ newTicket, ticket });
          }) 
        }
      })      
           
    } catch (err) {
      console.error(err);
      next({
        code: 500,
        message: 'Could not update the ticket.'
      });
    }
});

router.delete('/:id', async (req, res, next) => {
    const ticketID = req.params.id;
    const userID = req.body.user_id;
    try {
      Tickets.findById(ticketID)
      .then(delTicket => {
        if (delTicket) {
          Tickets.remove(ticketID, userID)
          .then(() => {
            res.status(200).json({
              message: 'Ticket successfully deleted.'
            });
          })
        }
      })
    } catch (err) {
      console.error(err);
      next({
        code: 500,
        message: 'Could not delete the ticket.'
      });
    }
});
  
router.get('/:id', async (req, res) => {
    const ticketID = req.params.id;
  
    try {
      const tickets = await Tickets.findById(ticketID);
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error });
    }
});
  
router.get('/:id/comments', async (req, res) => {
    const ticketID = req.params.id;
  
    try {
      const tickets = await Tickets.findComments(ticketID);
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error });
    }
});

router.patch('/:id/:action', async (req, res, next) => {
  const userID = req.body.user_id;
  const ticketID = req.params.id;
  const action = req.params.action.toUpperCase();
  let change;

  switch (action) {
    case 'CLAIM':
      change = { claimed_by: userID };
      break;

    case 'RELEASE':
      change = { claimed_by: null };
      break;

    case 'OPEN':
      change = { status: 'OPEN' };
      break;

    case 'CLOSE':
      change = { status: 'CLOSED' };
      break;

    default:
      return next({
        code: 400,
        message: 'Please provide a valid action.',
      });
  }

  try {
    const ticket = await Tickets.findById(ticketID);

    if (ticket.claimed_by_id && ticket.claimed_by_id !== userID)
      return next({
        code: 403,
        message: 'This ticket is already claimed.',
      });

    if (!ticket.claimed_by_id && action === 'release')
      return next({
        code: 403,
        message: 'This ticket has not been claimed.',
      });

    if (ticket.posted_by_id === userID) {
      if (action === 'claim' || action === 'release')
        return next({
          code: 403,
          message: 'You can\'t claim or release your own ticket.',
        });
    }

    if (ticket.claimed_by_id === userID) {
      if (action === 'claim')
        return next({
          code: 403,
          message: 'You\'ve already claimed this ticket.',
        });
    }

    const [editedTicket] = await Tickets.assert(change, ticketID);
    res.status(201).json(editedTicket);
  } catch (err) {
    console.error(err);
    next({
      code: 500,
      message: 'Could not update ticket.',
    });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Tickets = require('./tickets-model.js');
// const jwt = require('jsonwebtoken');

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
    const userID = req.jwt.id;
    const ticketID = req.params.id;
    const { title, description, what_i_tried, categories } = req.body;
  
    if (title === '')
      return next({
        code: 400,
        message: 'Please provide a title and description.',
      });
  
    try {
      const ticket = { title, description, what_i_tried };
      const updatedTicket = await Tickets.update(
        ticket,
        categories,
        ticketID,
        userID
      );
      res.status(201).json(updatedTicket);
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
    const userID = req.jwt.id;
    try {
      const count = await Tickets.remove(ticketID, userID);
      if (!count) return next({
        code: 404,
        message: 'Ticket not found'
      });
      res.status(200).json(count);
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

module.exports = router;
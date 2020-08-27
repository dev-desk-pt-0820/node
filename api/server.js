const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const verification = require('../auth/auth-middleware.js');

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/users-router.js');
const ticketRouter = require('../tickets/tickets-router.js');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({
        message: 'Welcome!'
    });
});

server.get('/api', (req, res) => {
    res
      .writeHead(302, {
        Location: 'https://documenter.getpostman.com/view/11973259/TVCZbXDL',
      })
      .end();
  });

server.use(verification);
server.use('/api/users', userRouter);
server.use('/api/tickets', ticketRouter);

module.exports = server;
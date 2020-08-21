const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const authMiddleware = require('../auth/auth-middleware.js');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/user', authMiddleware);
// server.use('/api/user');
// server.use('/api/tickets');
// server.use('api/tickets/queue');

server.get('/', (req, res) => {
    res.json({
        message: 'Welcome!'
    });
});

module.exports = server;
import 'module-alias/register';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/no-require-imports
const morgan = require('morgan');

import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import hashRouter from 'src/routers/hashRouter';
import contractRouter from 'src/routers/contractRouter';
import { gameRoomEvents } from 'src/socketio/eventHandlers';
import gameResultsRouter from 'src/routers/gameResultsRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [];

if (process.env.ENV === 'dev') {
  allowedOrigins.push('http://localhost:5173');
} else {
  allowedOrigins.push(process.env.APP_BASE_URL || '');
}

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(morgan('tiny'));

app.use('/hash', hashRouter);
app.use('/contract', contractRouter);
app.use('/gameResults', gameResultsRouter);

const server = http.createServer(app);
const ioServer = new Server(server);

ioServer.on('connection', (socket) => {
  gameRoomEvents(socket, ioServer);
});

server.listen(3000);

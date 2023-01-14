import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

import {
  joinBottle,
  handleChat,
  readChats,
  getLatestChat,
} from './controller/chat-controller.js';

// Socket
const httpServer = createServer(app);
const io = new Server(httpServer, { path: '/api/chat-service/socket' });

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  joinBottle(socket);
  handleChat(io, socket);

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected due to ' + reason);
  });
});

// Routes
const router = express.Router();

// Controller will contain all the Chat-defined Routes
router.get('/', (_, res) => res.send('Hello World from chat-service'));
router.get('/read', readChats);
router.get('/latest', getLatestChat);

app.use('/api/chat', router).all((_, res) => {
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
});

httpServer.listen(8002, () =>
  console.log('chat-service listening on port 8002')
);

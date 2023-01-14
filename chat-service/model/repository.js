import 'dotenv/config';

import ChatModel from './chat-model.js';

// Set up mongoose connection
import mongoose from 'mongoose';

const mongoDB = process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createChat(params) {
  return new ChatModel(params);
}

export async function getChatsByBottleID(bottleID) {
  return await ChatModel.find({ bottleID }).sort({ createdAt: 1 }).exec();
}

export async function getLatestChatByBottleID(bottleID) {
  return await ChatModel.findOne({ bottleID }).sort({ createdAt: -1 }).exec();
}

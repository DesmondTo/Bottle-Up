import 'dotenv/config';
import BottleModel from './bottle-model.js';
import BottleQueueModel from './bottle-queue-model.js';

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createBottle(params) {
  return new BottleModel(params);
}

export async function removeBottleFromQueue(username) {
  // Get the count of all bottles in queue
  const count = await BottleQueueModel.count({username: {$ne: username}}).exec();
  if (count < 1) {
    return null;
  }

  // Get a random number
  var random = Math.floor(Math.random() * count);

  // Again query all bottles but only pop one offset by random number
  return await BottleQueueModel.findOneAndDelete({username: {$ne: username}}).skip(random).exec();
}

export async function addBottleToQueue(params) {
  return new BottleQueueModel(params);
}

export async function getBottleByBottleID(bottleID) {
  return await BottleModel.findOne({ bottleID }).exec();
}

// Returns the bottles belongs to specified user, or null if not found
export async function getBottlesByUsername(username) {
  return await BottleModel.find({ username }).exec();
}

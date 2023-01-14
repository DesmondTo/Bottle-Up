import {
  createBottle,
  removeBottleFromQueue,
  addBottleToQueue,
  getBottleByBottleID,
  getBottlesByUsername,
} from './repository.js';

// need to separate orm functions from repository to decouple business logic from persistence

// Create a new bottle
export async function ormCreateBottle(bottleID, username) {
  try {
    const newBottle = await createBottle({ bottleID, username });
    newBottle.save();
    return true;
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { err };
  }
}

// Return true if the bottle exist
export async function ormCheckBottleExistence(bottleID) {
  try {
    const bottleFound = await getBottleByBottleID(bottleID);
    return bottleFound ? true : false;
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { err };
  }
}

// Return a bottle from queue randomly, or null if does not exist
export async function ormRemoveBottleFromQueue(username) {
  try {
    return await removeBottleFromQueue(username);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { err };
  }
}

// Add a bottle back to queue
export async function ormAddBottleToQueue(bottleID, username) {
  try {
    const newBottleQueue = await addBottleToQueue({ bottleID, username });
    newBottleQueue.save();
    return true;
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { err };
  }
}

// Return the corresponding bottles, or null if does not exist
export const ormGetBottles = async (username) => {
  try {
    return await getBottlesByUsername(username);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { err };
  }
};

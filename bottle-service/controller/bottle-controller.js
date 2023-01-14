import {
  ormCreateBottle as _createBottle,
  ormCheckBottleExistence as _checkBottleExistence,
  ormRemoveBottleFromQueue as _removeBottleFromQueue,
  ormAddBottleToQueue as _addBottleToQueue,
  ormGetBottles as _getBottles,
} from '../model/bottle-orm.js';
import { v4 as uuidv4 } from 'uuid';

export async function createBottle(req, res) {
  try {
    const { username } = req.body;
    let bottleID = uuidv4();
    if (username) {
      while (await _checkBottleExistence(bottleID)) {
        // generate an unique ID until it is not found in the database
        bottleID = uuidv4();
      }

      // Create new bottle and add to queue
      await _createBottle(bottleID, username);
      await _addBottleToQueue(bottleID, username);

      return res.status(201).json({
        success: true,
        bottleID: bottleID,
        message: `${username}'s bottle created successfully.`,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: 'Username is missing.' });
    }
  } catch (_) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error when creating bottle.' });
  }
}

export async function collectBottle(req, res) {
  try {
    const { username, bottleID } = req.body;
    if (username && bottleID) {
      if (!(await _checkBottleExistence(bottleID))) {
        return res
          .status(400)
          .json({ success: false, message: 'Bottle not found.' });
      }

      // add another user to the collected bottle
      await _createBottle(bottleID, username);

      return res.status(201).json({
        success: true,
        message: `Bottle collected successfully by ${username}.`,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Username/bottle's id is missing." });
    }
  } catch (_) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error when creating bottle.' });
  }
}

export async function findBottle(req, res) {
  try {
    // Find bottle in the queue
    const { username } = req.params;
    const bottle = await _removeBottleFromQueue(username);
    if (!bottle) {
      return res
        .status(400)
        .json({ success: false, message: 'No bottle at the moment...' });
    }

    return res.status(201).json({
      success: true,
      bottle,
      message: `Bottle found!`,
    });
  } catch (_) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error when finding bottle.' });
  }
}

export async function throwBottle(req, res) {
  try {
    // Throw bottle into the queue
    const { bottleID, username } = req.body;
    await _addBottleToQueue(bottleID, username);
    return res
      .status(201)
      .json({ success: true, message: `Bottle thrown successfully.` });
  } catch (_) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error when finding bottle.' });
  }
}

export async function getUserBottles(req, res) {
  try {
    const { username } = req.params;
    if (username) {
      // Find all the bottles the user has
      const bottles = await _getBottles(username);
      if (!bottles) {
        return res
          .status(400)
          .json({ success: false, message: `User ${username} has no bottle.` });
      }

      return res.status(201).json({
        success: true,
        bottles,
        message: `Bottles of user ${username} found.`,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: 'Username is missing.' });
    }
  } catch (_) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error when finding bottle.' });
  }
}

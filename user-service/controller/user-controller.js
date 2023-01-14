import {
  ormCreateUser as _createUser,
  ormGetUser as _getUser,
  ormCheckPassword as _checkPassword,
} from '../model/user-orm.js';

export async function createUser(req, res) {
  try {
    let { username, password } = req.body;
    if (username && password) {
      // Make username case insensitive
      username = username.toLowerCase();

      // Check if user exists
      const isExisted = await _getUser(username);
      if (isExisted) {
        return res
          .status(401)
          .json({ success: false, message: 'User already exists.' });
      }

      // Create user
      await _createUser(username, password);
      return res.status(201).json({
        success: true,
        message: `Account ${username} created successfully.`,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: 'Username or Password is missing.' });
    }
  } catch (_) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error when creating user.' });
  }
}

export async function signin(req, res) {
  try {
    let { username, password } = req.body;
    if (username && password) {
      // Make username case insensitive
      username = username.toLowerCase();

      // Check if user exists
      const user = await _getUser(username);
      if (!user) {
        // Vague message for privacy concerns
        return res.status(401).json({
          success: false,
          message: 'User does not exist and/or wrong password.',
        });
      }

      // Check if password is correct
      const isPasswordCorrect = await _checkPassword(user.password, password);
      if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: 'User does not exist and/or wrong password.',
        });
      }

      return res
        .status(200)
        .json({ success: true, message: 'Signed in successfully.' });
    } else {
      return res
        .status(400)
        .json({ success: false, message: 'Missing username and/or password.' });
    }
  } catch (_) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error when signing in user.' });
  }
}

export async function signout(req, res) {
  try {
    return res
      .status(200)
      .json({ success: true, message: 'Signed out successfully.' });
  } catch (_) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error when signing out user.' });
  }
}

import { createUser, getUserByUsername } from './repository.js';

// need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
  try {
    const newUser = await createUser({ username, password });
    newUser.save();
    return true;
  } catch (err) {
    console.log('ERROR: Could not create new user');
    return { err };
  }
}

// Returns the corresponding user, or null if does not exist
export const ormGetUser = async (username) => {
  return await getUserByUsername(username);
};

// Returns true if password is correct, else false
export const ormCheckPassword = async (userPassword, password) => {
  return userPassword === password;
};

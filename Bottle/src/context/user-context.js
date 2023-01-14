import { createContext, useState } from 'react';
import { signUpAPI, signInAPI, signOutAPI } from '../api/user-api';

const UserContext = createContext({
  username: '',
  isSignedIn: false,
  onSignOut: async () => {},
  onSignIn: async () => {},
  onSignUp: async () => {},
});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signUpHandler = async (username, password) => {
    const signUpResponse = await signUpAPI(username, password);
    const signUpSuccess = signUpResponse.success;

    setUsername(signUpSuccess ? username : '');
    setIsSignedIn(signUpSuccess);

    return signUpResponse;
  };

  const signInHandler = async (username, password) => {
    const signInResponse = await signInAPI(username, password);
    const signInSuccess = signInResponse.success;

    setUsername(signInSuccess ? username : '');
    setIsSignedIn(signInSuccess);

    return signInResponse;
  };

  const signOutHandler = async () => {
    const signOutResponse = await signOutAPI();
    const signOutSuccess = signOutResponse.success;

    setUsername(signOutSuccess ? '' : username);
    setIsSignedIn(!signOutSuccess);

    return signOutResponse;
  };

  return (
    <UserContext.Provider
      value={{
        username,
        isSignedIn,
        onSignIn: signInHandler,
        onSignOut: signOutHandler,
        onSignUp: signUpHandler,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

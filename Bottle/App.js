/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Bottle from './src/index';
import { UserContextProvider } from './src/context/user-context';

const App = () => {
  return (
    <UserContextProvider>
      <Bottle />
    </UserContextProvider>
  );
};

export default App;

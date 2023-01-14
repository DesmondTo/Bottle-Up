import { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UserContext from './context/user-context';
import {
  OceanStackScreen,
  ChatStackScreen,
  ProfileStackScreen,
  SignInStackScreen,
  SignUpStackScreen,
} from './navigation';
import Layout from './component/layout';

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const Tab = createBottomTabNavigator();

const Bottle = () => {
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isSignedIn;

  return (
    <NavigationContainer theme={defaultTheme}>
      <Layout>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Tab.Group>
              <Tab.Screen name="Ocean" component={OceanStackScreen} />
              <Tab.Screen name="Chat" component={ChatStackScreen} />
              <Tab.Screen name="Profile" component={ProfileStackScreen} />
            </Tab.Group>
          ) : (
            <Tab.Group>
              <Tab.Screen name="SignIn" component={SignInStackScreen} />
              <Tab.Screen name="SignUp" component={SignUpStackScreen} />
            </Tab.Group>
          )}
        </Tab.Navigator>
      </Layout>
    </NavigationContainer>
  );
};

export default Bottle;

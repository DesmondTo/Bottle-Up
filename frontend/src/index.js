import { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageBackground, StyleSheet, Text } from 'react-native';

import UserContext from './context/user-context';
import {
  OceanStackScreen,
  ChatStackScreen,
  ProfileStackScreen,
  SignInStackScreen,
  SignUpStackScreen,
} from './navigation';

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Tab = createBottomTabNavigator();

const Bottle = () => {
  const userCtx = useContext(UserContext);
  const isLoggedIn = userCtx.isSignedIn;
  const image = require('./asset/background.png');

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <NavigationContainer theme={defaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => {
            return {
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let textIcon;

                if (route.name === 'Ocean') {
                  textIcon = '🌊';
                } else if (route.name === 'Chat') {
                  textIcon = '💬';
                } else if (route.name === 'Profile') {
                  textIcon = '⚙️';
                } else if (route.name === 'SignIn') {
                  textIcon = '⎆';
                } else if (route.name === 'SignUp') {
                  textIcon = '🙋‍♂️';
                }

                // You can return any component that you like here!
                return <Text>{textIcon}</Text>;
              },
            };
          }}>
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
      </NavigationContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Bottle;

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OceanScreen from '../screens/OceanScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import BottleScreen from '../screens/BottleScreen';

const OceanStack = createNativeStackNavigator();
export function OceanStackScreen() {
  return (
    <OceanStack.Navigator>
      <OceanStack.Screen name="OceanScreen" component={OceanScreen} />
      <OceanStack.Group screenOptions={{ presentation: 'modal' }}>
        <OceanStack.Screen name="BottleScreen" component={BottleScreen} />
      </OceanStack.Group>
    </OceanStack.Navigator>
  );
}

const ChatStack = createNativeStackNavigator();
export function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
      <ChatStack.Group
        screenOptions={{
          presentation: 'card',
          headerBackTitleVisible: false,
        }}>
        <ChatStack.Screen name="BottleScreen" component={BottleScreen} />
      </ChatStack.Group>
    </ChatStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
export function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const SignInStack = createNativeStackNavigator();
export function SignInStackScreen() {
  return (
    <SignInStack.Navigator>
      <SignInStack.Group screenOptions={{ headerShown: false }}>
        <SignInStack.Screen name="SignInScreen" component={SignInScreen} />
        <SignInStack.Screen name="OceanScreen" component={OceanScreen} />
      </SignInStack.Group>
    </SignInStack.Navigator>
  );
}

const SignUpStack = createNativeStackNavigator();
export function SignUpStackScreen() {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Group screenOptions={{ headerShown: false }}>
        <SignUpStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <SignInStack.Screen name="OceanScreen" component={OceanScreen} />
      </SignUpStack.Group>
    </SignUpStack.Navigator>
  );
}

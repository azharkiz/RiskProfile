import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FirebaseProvider } from './src/services/context/FirebaseContext';
import HomeScreen from './src/Modules/HomeScreen';
import LoginScreen from './src/Modules/LoginScreen';
import ProfileScreen from './src/Modules/ProfileScreen';
import SignupScreen from './src/Modules/SignupScreen';
import './src/services/config/firebaseConfig';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      
    </Stack.Navigator>
  </NavigationContainer>
);

const App = () => (
  <FirebaseProvider>
    <AppNavigator />
  </FirebaseProvider>
);

export default App;

import React from 'react';
import SignupScreen from '../screens/auth/SignupScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ForgetPasswordScreen from '../screens/auth/ForgetPasswordScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Phonebook from '../screens/Phonebook';
import {Routes} from './routes';
import {NavigationContainer} from '@react-navigation/native';

export type RouteStackParamsList = {
  [Routes.LoginScreen]: undefined;
  SignupScreen: undefined;
  SplashScreen: undefined;
  HomeScreen: undefined;
  Phonebook: {
    id: string;
    firstNameValue: string;
    lastNameValue: string;
    phoneNumberValue: string;
    mobileNumberValue: string;
    workNumberValue: string;
    homeNumberValue: string;
    imageValue: string | undefined;
  };
  ForgetPasswordScreen: undefined;
};

const Stack = createNativeStackNavigator<RouteStackParamsList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Routes.SplashScreen}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.LoginScreen}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.SignupScreen}
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.HomeScreen}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.Phonebook}
          component={Phonebook}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.ForgetPasswordScreen}
          component={ForgetPasswordScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

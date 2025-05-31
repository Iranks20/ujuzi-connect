/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import BottomNavigation from './src/components/BottomNavigation';

// Import screens
import {
  WelcomeScreen,
  SignUpScreen,
  LoginScreen,
  OnboardingScreenTwo,
  OnboardingScreenThree,
  AIRecommendationsScreen,
} from './src/screens';

// Define the root stack navigator type
export type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  OnboardingTwo: undefined;
  OnboardingThree: undefined;
  AIRecommendations: undefined;
  MainApp: undefined;
  Booking: undefined;
  Payment: undefined;
  PaymentConfirmation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OnboardingTwo" component={OnboardingScreenTwo} />
          <Stack.Screen name="OnboardingThree" component={OnboardingScreenThree} />
          <Stack.Screen name="AIRecommendations" component={AIRecommendationsScreen} />
          <Stack.Screen 
            name="MainApp" 
            component={BottomNavigation}
            options={{
              animation: 'none',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';

// Import all screens
import {
  WelcomeScreen,
  SignUpScreen,
  LoginScreen,
  OnboardingScreenTwo,
  OnboardingScreenThree,
  ProfessionalProfileScreen,
  BookingScreen,
  PaymentScreen,
  PaymentConfirmationScreen,
  ChatScreen,
  GroupChatScreen,
  JobDetailsScreen,
  RecruiterDashboardScreen,
  AIRecommendationsScreen,
  CategoryScreen,
} from './src/screens';

// Import BottomNavigation
import BottomNavigation from './src/components/BottomNavigation';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Auth and Onboarding Screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OnboardingTwo" component={OnboardingScreenTwo} />
        <Stack.Screen name="OnboardingThree" component={OnboardingScreenThree} />

        {/* Main App Screens with Bottom Navigation */}
        <Stack.Screen name="MainApp" component={BottomNavigation} />

        {/* Modal and Detail Screens */}
        <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfileScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="GroupChat" component={GroupChatScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
        <Stack.Screen name="RecruiterDashboard" component={RecruiterDashboardScreen} />
        <Stack.Screen name="AIRecommendations" component={AIRecommendationsScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

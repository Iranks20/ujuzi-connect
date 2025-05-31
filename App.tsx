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
  DoctorSpecializationScreen,
  DoctorReviewsScreen,
  DoctorAvailabilityScreen,
  MedicalHistoryScreen,
  BookingScreen,
  PaymentScreen,
  PaymentConfirmationScreen,
  CategoryScreen,
  ProfessionalProfileScreen,
  ChatScreen,
  GroupsScreen,
  ChatListScreen,
  GroupChatScreen,
  AccountProfileScreen,
  JobsScreen,
  JobDetailsScreen,
  JobApplicationScreen,
  JobApplicationsListScreen,
  JobPostScreen,
  JobSearchResultsScreen,
  JobApplicationSuccessScreen,
  RecruiterDashboardScreen,
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
  Booking: { professionalId: string; date?: string; time?: string };
  Payment: { bookingId: string; amount: number };
  PaymentConfirmation: { bookingId: string };
  DoctorSpecialization: undefined;
  DoctorReviews: { professionalId: string };
  DoctorAvailability: { professionalId: string };
  MedicalHistory: undefined;
  Category: { category: string; icon: string; color: string };
  ProfessionalProfile: { id: number };
  Chat: { professionalId: string };
  Groups: undefined;
  ChatList: undefined;
  GroupChat: { groupId: string; groupName: string };
  Account: undefined;
  Jobs: undefined;
  JobDetails: { id: number };
  JobApplication: { jobId: number };
  JobApplicationsList: { jobId: number };
  JobPost: undefined;
  JobSearchResults: { query: string };
  JobApplicationSuccess: undefined;
  RecruiterDashboard: undefined;
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
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
          <Stack.Screen name="DoctorSpecialization" component={DoctorSpecializationScreen} />
          <Stack.Screen name="DoctorReviews" component={DoctorReviewsScreen} />
          <Stack.Screen name="DoctorAvailability" component={DoctorAvailabilityScreen} />
          <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfileScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Groups" component={GroupsScreen} />
          <Stack.Screen name="ChatList" component={ChatListScreen} />
          <Stack.Screen name="GroupChat" component={GroupChatScreen} />
          <Stack.Screen name="Account" component={AccountProfileScreen} />
          <Stack.Screen name="Jobs" component={JobsScreen} />
          <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
          <Stack.Screen name="JobApplication" component={JobApplicationScreen} />
          <Stack.Screen name="JobApplicationsList" component={JobApplicationsListScreen} />
          <Stack.Screen name="JobPost" component={JobPostScreen} />
          <Stack.Screen name="JobSearchResults" component={JobSearchResultsScreen} />
          <Stack.Screen name="JobApplicationSuccess" component={JobApplicationSuccessScreen} />
          <Stack.Screen name="RecruiterDashboard" component={RecruiterDashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

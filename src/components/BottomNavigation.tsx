'use client';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Platform } from 'react-native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

// Import screens
import {
  ExploreScreen,
  GroupsScreen,
  JobsScreen,
  ChatListScreen,
  AccountProfileScreen,
  ChatScreen,
  GroupChatScreen,
  JobDetailsScreen,
  ProfessionalProfileScreen,
  CategoryScreen,
  BookingScreen,
  PaymentScreen,
  PaymentConfirmationScreen,
} from '../screens';

// Define the tab navigator type
export type RootTabParamList = {
  Explore: undefined;
  Groups: undefined;
  Jobs: undefined;
  Chat: undefined;
  Account: undefined;
};

// Define the stack navigator type for each tab
export type ExploreStackParamList = {
  ExploreMain: undefined;
  Category: { category: string; icon: string; color: string };
  ProfessionalProfile: { id: number };
  Booking: undefined;
  Payment: undefined;
  PaymentConfirmation: undefined;
};

export type GroupsStackParamList = {
  GroupsMain: undefined;
  GroupChat: { groupId: number };
};

export type JobsStackParamList = {
  JobsMain: undefined;
  JobDetails: { id: number };
};

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: { professionalId: number };
};

export type AccountStackParamList = {
  AccountMain: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const GroupsStack = createNativeStackNavigator<GroupsStackParamList>();
const JobsStack = createNativeStackNavigator<JobsStackParamList>();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();
const AccountStack = createNativeStackNavigator<AccountStackParamList>();

// Stack navigators for each tab
const ExploreStackNavigator = () => (
  <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
    <ExploreStack.Screen name="ExploreMain" component={ExploreScreen} />
    <ExploreStack.Screen name="Category" component={CategoryScreen} />
    <ExploreStack.Screen name="ProfessionalProfile" component={ProfessionalProfileScreen} />
    <ExploreStack.Screen name="Booking" component={BookingScreen} />
    <ExploreStack.Screen name="Payment" component={PaymentScreen} />
    <ExploreStack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
  </ExploreStack.Navigator>
);

const GroupsStackNavigator = () => (
  <GroupsStack.Navigator screenOptions={{ headerShown: false }}>
    <GroupsStack.Screen name="GroupsMain" component={GroupsScreen} />
    <GroupsStack.Screen name="GroupChat" component={GroupChatScreen} />
  </GroupsStack.Navigator>
);

const JobsStackNavigator = () => (
  <JobsStack.Navigator screenOptions={{ headerShown: false }}>
    <JobsStack.Screen name="JobsMain" component={JobsScreen} />
    <JobsStack.Screen name="JobDetails" component={JobDetailsScreen} />
  </JobsStack.Navigator>
);

const ChatStackNavigator = () => (
  <ChatStack.Navigator screenOptions={{ headerShown: false }}>
    <ChatStack.Screen name="ChatList" component={ChatListScreen} />
    <ChatStack.Screen name="Chat" component={ChatScreen} />
  </ChatStack.Navigator>
);

const AccountStackNavigator = () => (
  <AccountStack.Navigator screenOptions={{ headerShown: false }}>
    <AccountStack.Screen name="AccountMain" component={AccountProfileScreen} />
  </AccountStack.Navigator>
);

// Tab bar icon component with proper typing
const TabBarIcon = ({ name, focused }: { name: keyof RootTabParamList; focused: boolean }) => {
  const getIcon = () => {
    switch (name) {
      case 'Explore':
        return '🔍';
      case 'Groups':
        return '👥';
      case 'Jobs':
        return '💼';
      case 'Chat':
        return '💬';
      case 'Account':
        return '👤';
      default:
        return '•';
    }
  };

  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, focused && styles.iconFocused]}>
        {getIcon()}
      </Text>
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
};

// Custom tab bar button component
const TabBarButton = ({ children, onPress, accessibilityState }: any) => {
  const focused = accessibilityState?.selected;

  return (
    <View 
      style={[styles.tabBarButton, focused && styles.tabBarButtonFocused]}
      onTouchEnd={onPress}
    >
      {children}
    </View>
  );
};

const BottomNavigation = () => {
  // Common screen options
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: styles.tabBar,
    tabBarShowLabel: true,
    tabBarActiveTintColor: '#1e3a8a',
    tabBarInactiveTintColor: '#6B7280',
    tabBarLabelStyle: styles.tabBarLabel,
    tabBarButton: (props) => <TabBarButton {...props} />,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Explore"
        component={ExploreStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="Explore" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="Groups" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="Jobs" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="Chat" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="Account" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    height: Platform.OS === 'ios' ? 85 : 60,
    position: 'relative',
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    fontSize: 24,
    color: '#6B7280',
  },
  iconFocused: {
    color: '#1e3a8a',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1e3a8a',
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabBarButtonFocused: {
    backgroundColor: 'rgba(30, 58, 138, 0.05)',
  },
});

export default BottomNavigation;
'use client';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import screens
import {
  ExploreScreen,
  GroupsScreen,
  JobsScreen,
  ChatListScreen,
  AccountProfileScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

type RootStackParamList = {
  Explore: undefined;
  Groups: undefined;
  Jobs: undefined;
  ChatList: undefined;
  AccountProfile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TabBarIcon = ({ name, focused }: { name: string; focused: boolean }) => {
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
    <Text style={[styles.icon, focused && styles.iconFocused]}>
      {getIcon()}
    </Text>
  );
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#1e3a8a',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="Explore" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="Groups" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="Jobs" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatListScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon name="Chat" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountProfileScreen}
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
    paddingBottom: 8,
    paddingTop: 8,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  icon: {
    fontSize: 24,
  },
  iconFocused: {
    color: '#1e3a8a',
  },
});

export default BottomNavigation;
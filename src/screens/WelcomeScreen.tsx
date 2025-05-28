'use client';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>U</Text>
          </View>
          <Text style={styles.logoTitle}>Ujuzi</Text>
        </View>
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBox}>
            <Text style={styles.emoji}>🤝</Text>
          </View>
        </View>

        {/* Welcome text */}
        <Text style={styles.welcomeTitle}>
          Connect with Top Professionals
        </Text>
        <Text style={styles.welcomeSubtitle}>
          Find, book and pay for services from verified professionals across Africa
        </Text>

        {/* Pagination dots */}
        <View style={styles.paginationContainer}>
          <View style={styles.paginationDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>

      {/* Bottom buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    backgroundColor: '#1e3a8a', // blue-900
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e3a8a', // blue-900
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  illustrationBox: {
    backgroundColor: '#dbeafe', // blue-100
    width: 256,
    height: 256,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 96,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937', // gray-800
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563', // gray-600
    marginBottom: 32,
  },
  paginationContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d1d5db', // gray-300
  },
  activeDot: {
    backgroundColor: '#1e3a8a', // blue-900
  },
  buttonContainer: {
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
  primaryButton: {
    backgroundColor: '#1e3a8a', // blue-900
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e3a8a', // blue-900
  },
  secondaryButtonText: {
    color: '#1e3a8a', // blue-900
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
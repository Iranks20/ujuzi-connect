'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  MainApp: undefined;
  SignUp: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    // TODO: Implement actual login logic
    navigation.navigate('MainApp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log In</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>U</Text>
            </View>
            <Text style={styles.logoTitle}>Ujuzi</Text>
          </View>
        </View>

        {/* Form fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
            />
          </View>
        </View>

        {/* Forgot password */}
        <TouchableOpacity 
          style={styles.forgotPasswordContainer}
          onPress={() => {/* Handle forgot password */}}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleLogin}
        >
          <Text style={styles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        {/* Social login buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sign up link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>
          Don't have an account?{' '}
          <Text 
            style={styles.signUpLink}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Text>
        </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#374151', // gray-700
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  logoWrapper: {
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
  formContainer: {
    gap: 16,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151', // gray-700
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db', // gray-300
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: '#1e3a8a', // blue-900
    fontSize: 14,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#1e3a8a', // blue-900
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 24,
  },
  primaryButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db', // gray-300
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#6b7280', // gray-500
    fontSize: 14,
  },
  socialButtonsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db', // gray-300
    borderRadius: 12,
  },
  socialButtonText: {
    color: '#374151', // gray-700
    fontSize: 16,
    fontWeight: '500',
  },
  signUpContainer: {
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
  signUpText: {
    textAlign: 'center',
    color: '#4b5563', // gray-600
  },
  signUpLink: {
    color: '#1e3a8a', // blue-900
    fontWeight: '500',
  },
});

export default LoginScreen;
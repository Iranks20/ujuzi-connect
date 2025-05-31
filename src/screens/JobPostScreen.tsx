'use client';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  RecruiterDashboard: undefined;
  JobPost: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const JobPostScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: '',
    deadline: '',
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log('Submitting job post:', formData);
    // Navigate back to recruiter dashboard
    navigation.navigate('RecruiterDashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Post a Job</Text>
          <View style={styles.placeholder} />
        </View>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        <View style={styles.form}>
          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Job Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter job title"
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Company</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter company name"
                value={formData.company}
                onChangeText={(text) => setFormData({ ...formData, company: text })}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter job location"
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Job Type</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Full-time, Part-time, Contract"
                value={formData.type}
                onChangeText={(text) => setFormData({ ...formData, type: text })}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Salary Range</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., UGX 3M - 5M monthly"
                value={formData.salary}
                onChangeText={(text) => setFormData({ ...formData, salary: text })}
              />
            </View>
          </View>
          
          {/* Job Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter detailed job description..."
              multiline
              numberOfLines={6}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
            />
          </View>
          
          {/* Requirements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter job requirements..."
              multiline
              numberOfLines={6}
              value={formData.requirements}
              onChangeText={(text) => setFormData({ ...formData, requirements: text })}
            />
          </View>
          
          {/* Application Deadline */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Application Deadline</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter application deadline"
              value={formData.deadline}
              onChangeText={(text) => setFormData({ ...formData, deadline: text })}
            />
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Post Job</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#374151',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingBottom: 100,
  },
  form: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    height: 150,
    textAlignVertical: 'top',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  submitButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default JobPostScreen; 
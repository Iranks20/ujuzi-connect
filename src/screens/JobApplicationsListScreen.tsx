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
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  JobDetails: { id: number };
  JobApplicationsList: { jobId: number };
};

type JobApplicationsListRouteProp = RouteProp<RootStackParamList, 'JobApplicationsList'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Application {
  id: number;
  applicantName: string;
  email: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  matchScore: number;
}

const JobApplicationsListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<JobApplicationsListRouteProp>();
  const { jobId } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  // Sample applications data
  const applications: Application[] = [
    {
      id: 1,
      applicantName: 'John Doe',
      email: 'john.doe@example.com',
      appliedDate: '2024-03-15',
      status: 'pending',
      matchScore: 85,
    },
    {
      id: 2,
      applicantName: 'Jane Smith',
      email: 'jane.smith@example.com',
      appliedDate: '2024-03-14',
      status: 'reviewed',
      matchScore: 92,
    },
    {
      id: 3,
      applicantName: 'Michael Johnson',
      email: 'michael.j@example.com',
      appliedDate: '2024-03-13',
      status: 'shortlisted',
      matchScore: 88,
    },
  ];

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'reviewed':
        return '#3B82F6';
      case 'shortlisted':
        return '#10B981';
      case 'rejected':
        return '#EF4444';
      default:
        return '#6B7280';
    }
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
          <Text style={styles.headerTitle}>Applications</Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search applications"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Applications list */}
        <View style={styles.applicationsList}>
          {applications.map(application => (
            <TouchableOpacity 
              key={application.id}
              style={styles.applicationCard}
            >
              <View style={styles.applicationHeader}>
                <View>
                  <Text style={styles.applicantName}>{application.applicantName}</Text>
                  <Text style={styles.applicantEmail}>{application.email}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(application.status) + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(application.status) }
                  ]}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.applicationDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Applied</Text>
                  <Text style={styles.detailValue}>{application.appliedDate}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Match Score</Text>
                  <Text style={styles.detailValue}>{application.matchScore}%</Text>
                </View>
              </View>
              
              <View style={styles.applicationActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>View Resume</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    marginBottom: 16,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 20,
    color: '#9CA3AF',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  applicationsList: {
    gap: 16,
  },
  applicationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  applicantEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  applicationDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    marginRight: 24,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  applicationActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
});

export default JobApplicationsListScreen; 
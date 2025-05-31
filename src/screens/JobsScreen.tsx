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
import type { JobsStackParamList } from '../components/BottomNavigation';

type NavigationProp = NativeStackNavigationProp<JobsStackParamList>;

interface JobCategory {
  id: number;
  name: string;
  icon: string;
  count: number;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  logo: string;
  isFeatured?: boolean;
}

const JobsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample job categories
  const jobCategories: JobCategory[] = [
    { id: 1, name: 'Healthcare', icon: '👨🏾‍⚕️', count: 124 },
    { id: 2, name: 'Engineering', icon: '👷🏾‍♂️', count: 87 },
    { id: 3, name: 'Education', icon: '👩🏾‍🏫', count: 65 },
    { id: 4, name: 'Legal', icon: '⚖️', count: 42 },
    { id: 5, name: 'Technology', icon: '💻', count: 156 },
    { id: 6, name: 'Finance', icon: '💰', count: 78 }
  ];
  
  // Sample featured jobs
  const featuredJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Pediatrician',
      company: 'Kampala Children\'s Hospital',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      salary: 'UGX 5M - 7M monthly',
      posted: '2 days ago',
      logo: '🏥',
      isFeatured: true
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'TechUganda',
      location: 'Remote (Uganda)',
      type: 'Full-time',
      salary: 'UGX 3.5M - 5M monthly',
      posted: '1 day ago',
      logo: '💻',
      isFeatured: true
    }
  ];
  
  // Sample recent jobs
  const recentJobs: Job[] = [
    {
      id: 3,
      title: 'Corporate Lawyer',
      company: 'East African Legal Consultants',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      salary: 'UGX 4M - 6M monthly',
      posted: '3 days ago',
      logo: '⚖️',
      isFeatured: false
    },
    {
      id: 4,
      title: 'Mathematics Lecturer',
      company: 'Makerere University',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      salary: 'UGX 3M - 4.5M monthly',
      posted: '4 days ago',
      logo: '🎓',
      isFeatured: false
    },
    {
      id: 5,
      title: 'Civil Engineer',
      company: 'Uganda Infrastructure Development',
      location: 'Entebbe, Uganda',
      type: 'Contract',
      salary: 'UGX 4.5M - 6M monthly',
      posted: '5 days ago',
      logo: '🏗️',
      isFeatured: false
    },
    {
      id: 6,
      title: 'Clinical Psychologist',
      company: 'Mental Health Uganda',
      location: 'Jinja, Uganda',
      type: 'Part-time',
      salary: 'UGX 2.5M - 3.5M monthly',
      posted: '1 week ago',
      logo: '🧠',
      isFeatured: false
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Careers</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>⋮</Text>
          </TouchableOpacity>
        </View>
        
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs, companies, or keywords"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Job categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesGrid}>
            {jobCategories.map(category => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
              >
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} jobs</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Featured jobs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Jobs</Text>
          {featuredJobs.map(job => (
            <TouchableOpacity 
              key={job.id}
              style={[styles.jobCard, styles.featuredJobCard]}
              onPress={() => navigation.navigate('JobDetails', { id: job.id })}
            >
              <View style={styles.jobContent}>
                <View style={styles.jobLogo}>
                  <Text style={styles.jobEmoji}>{job.logo}</Text>
                </View>
                <View style={styles.jobDetails}>
                  <View style={styles.jobHeader}>
                    <View>
                      <Text style={styles.jobTitle}>{job.title}</Text>
                      <Text style={styles.companyName}>{job.company}</Text>
                    </View>
                    {job.isFeatured && (
                      <View style={styles.featuredBadge}>
                        <Text style={styles.featuredText}>Featured</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.jobInfo}>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoIcon}>📍</Text>
                      <Text style={styles.infoText}>{job.location}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoIcon}>⏰</Text>
                      <Text style={styles.infoText}>{job.type}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoIcon}>💰</Text>
                      <Text style={styles.infoText}>{job.salary}</Text>
                    </View>
                  </View>
                  <View style={styles.jobFooter}>
                    <Text style={styles.postedTime}>Posted {job.posted}</Text>
                    <TouchableOpacity style={styles.applyButton}>
                      <Text style={styles.applyButtonText}>Apply Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Recent jobs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Jobs</Text>
          {recentJobs.map(job => (
            <TouchableOpacity 
              key={job.id}
              style={styles.jobCard}
              onPress={() => navigation.navigate('JobDetails', { id: job.id })}
            >
              <View style={styles.jobContent}>
                <View style={styles.jobLogo}>
                  <Text style={styles.jobEmoji}>{job.logo}</Text>
                </View>
                <View style={styles.jobDetails}>
                  <View style={styles.jobHeader}>
                    <View>
                      <Text style={styles.jobTitle}>{job.title}</Text>
                      <Text style={styles.companyName}>{job.company}</Text>
                    </View>
                  </View>
                  <View style={styles.jobInfo}>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoIcon}>📍</Text>
                      <Text style={styles.infoText}>{job.location}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoIcon}>⏰</Text>
                      <Text style={styles.infoText}>{job.type}</Text>
                    </View>
                  </View>
                  <View style={styles.jobFooter}>
                    <Text style={styles.postedTime}>Posted {job.posted}</Text>
                    <TouchableOpacity style={styles.applyButton}>
                      <Text style={styles.applyButtonText}>Apply Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  menuButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  menuButtonText: {
    fontSize: 20,
    color: '#374151',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '31%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#DBEAFE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featuredJobCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  jobContent: {
    flexDirection: 'row',
  },
  jobLogo: {
    width: 48,
    height: 48,
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  jobEmoji: {
    fontSize: 24,
  },
  jobDetails: {
    flex: 1,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  companyName: {
    fontSize: 14,
    color: '#6B7280',
  },
  featuredBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    fontSize: 12,
    color: '#1E40AF',
  },
  jobInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  infoIcon: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  postedTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  applyButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default JobsScreen;
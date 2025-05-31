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
  Jobs: undefined;
  JobDetails: { id: number };
  JobSearchResults: { query: string };
};

type JobSearchResultsRouteProp = RouteProp<RootStackParamList, 'JobSearchResults'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  logo: string;
  matchScore?: number;
}

const JobSearchResultsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<JobSearchResultsRouteProp>();
  const { query } = route.params;
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    location: '',
    salary: '',
  });

  // Sample search results
  const searchResults: Job[] = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechUganda',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      salary: 'UGX 3.5M - 5M monthly',
      posted: '2 days ago',
      logo: '💻',
      matchScore: 95,
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Solutions Ltd',
      location: 'Remote (Uganda)',
      type: 'Full-time',
      salary: 'UGX 2.5M - 4M monthly',
      posted: '1 day ago',
      logo: '👨🏾‍💻',
      matchScore: 88,
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'Innovation Hub',
      location: 'Entebbe, Uganda',
      type: 'Contract',
      salary: 'UGX 3M - 4.5M monthly',
      posted: '3 days ago',
      logo: '⚡',
      matchScore: 92,
    },
  ];

  const handleSearch = () => {
    // Handle search with filters
    console.log('Searching with:', { query: searchQuery, filters: selectedFilters });
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
          <Text style={styles.headerTitle}>Search Results</Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Job Type</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Salary Range</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Experience</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Search results */}
        <View style={styles.resultsList}>
          {searchResults.map(job => (
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
                    {job.matchScore && (
                      <View style={styles.matchScore}>
                        <Text style={styles.matchScoreText}>{job.matchScore}% Match</Text>
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
  searchButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  filtersContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  resultsList: {
    gap: 16,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  matchScore: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  matchScoreText: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '500',
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

export default JobSearchResultsScreen; 
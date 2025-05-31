'use client';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ProfessionalProfile: undefined;
  JobDetails: { id: number };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Professional {
  id: number;
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  matchScore: number;
  reason: string;
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
  matchScore: number;
  reason: string;
}

interface Group {
  id: number;
  name: string;
  members: number;
  image: string;
  color: string;
  matchScore: number;
  reason: string;
}

interface User {
  name: string;
  interests: string[];
  recentSearches: string[];
}

const AIRecommendationsScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // Sample user data
  const user: User = {
    name: 'David Mugisha',
    interests: ['Healthcare', 'Education', 'Technology'],
    recentSearches: ['Pediatrician', 'Software Engineer', 'Math Tutor']
  };
  
  // Sample recommended professionals
  const recommendedProfessionals: Professional[] = [
    {
      id: 1,
      name: 'Dr. Sarah Mukasa',
      profession: 'Pediatrician',
      rating: 4.9,
      reviews: 124,
      price: 'UGX 50,000',
      image: '👩🏾‍⚕️',
      matchScore: 95,
      reason: 'Based on your recent search for pediatric services'
    },
    {
      id: 2,
      name: 'John Okello',
      profession: 'Software Engineer',
      rating: 4.8,
      reviews: 87,
      price: 'UGX 45,000',
      image: '👨🏾‍💻',
      matchScore: 92,
      reason: 'Matches your interest in technology'
    },
    {
      id: 3,
      name: 'Prof. Elizabeth Ochieng',
      profession: 'Mathematics Tutor',
      rating: 4.7,
      reviews: 56,
      price: 'UGX 35,000',
      image: '👩🏾‍🏫',
      matchScore: 88,
      reason: 'Based on your recent search for educational services'
    }
  ];
  
  // Sample recommended jobs
  const recommendedJobs: Job[] = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechUganda',
      location: 'Remote (Uganda)',
      type: 'Full-time',
      salary: 'UGX 3.5M - 5M monthly',
      posted: '1 day ago',
      logo: '💻',
      matchScore: 94,
      reason: 'Matches your skills and interests in technology'
    },
    {
      id: 2,
      title: 'Medical Research Assistant',
      company: 'Kampala Health Institute',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      salary: 'UGX 2.5M - 3.5M monthly',
      posted: '3 days ago',
      logo: '🔬',
      matchScore: 89,
      reason: 'Aligns with your interest in healthcare'
    }
  ];
  
  // Sample recommended groups
  const recommendedGroups: Group[] = [
    {
      id: 1,
      name: 'Tech Entrepreneurs Uganda',
      members: 876,
      image: '💻',
      color: 'bg-purple-100',
      matchScore: 91,
      reason: 'Based on your interest in technology'
    },
    {
      id: 2,
      name: 'Healthcare Professionals Network',
      members: 1245,
      image: '👨🏾‍⚕️',
      color: 'bg-blue-100',
      matchScore: 88,
      reason: 'Matches your interest in healthcare'
    },
    {
      id: 3,
      name: 'Educators Forum',
      members: 1120,
      image: '👩🏾‍🏫',
      color: 'bg-green-100',
      matchScore: 85,
      reason: 'Aligns with your interest in education'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>AI Recommendations</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* AI Insights Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerIcon}>
            <Text style={styles.bannerIconText}>💡</Text>
          </View>
          <View>
            <Text style={styles.bannerTitle}>Personalized for You, {user.name}</Text>
            <Text style={styles.bannerSubtitle}>Based on your interests and activity</Text>
          </View>
        </View>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Recommended professionals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Professionals</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.professionalsList}>
            {recommendedProfessionals.map(professional => (
              <TouchableOpacity 
                key={professional.id}
                style={styles.professionalCard}
                onPress={() => navigation.navigate('ProfessionalProfile')}
              >
                <View style={styles.professionalHeader}>
                  <View style={styles.professionalAvatar}>
                    <Text style={styles.professionalAvatarText}>{professional.image}</Text>
                    <View style={styles.matchScore}>
                      <Text style={styles.matchScoreText}>{professional.matchScore}%</Text>
                    </View>
                  </View>
                  <View style={styles.professionalInfo}>
                    <View style={styles.professionalTitle}>
                      <View>
                        <Text style={styles.professionalName}>{professional.name}</Text>
                        <Text style={styles.professionalProfession}>{professional.profession}</Text>
                      </View>
                      <View style={styles.rating}>
                        <Text style={styles.ratingIcon}>⭐</Text>
                        <Text style={styles.ratingText}>{professional.rating}</Text>
                        <Text style={styles.reviewsText}>({professional.reviews})</Text>
                      </View>
                    </View>
                    <View style={styles.professionalFooter}>
                      <Text style={styles.reasonText}>"{professional.reason}"</Text>
                      <Text style={styles.priceText}>{professional.price}</Text>
                    </View>
                    <View style={styles.professionalActions}>
                      <TouchableOpacity style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Book</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>Chat</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Recommended jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Job Opportunities for You</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.jobsList}>
            {recommendedJobs.map(job => (
              <TouchableOpacity 
                key={job.id}
                style={styles.jobCard}
                onPress={() => navigation.navigate('JobDetails', { id: job.id })}
              >
                <View style={styles.jobHeader}>
                  <View style={styles.jobLogo}>
                    <Text style={styles.jobLogoText}>{job.logo}</Text>
                    <View style={styles.matchScore}>
                      <Text style={styles.matchScoreText}>{job.matchScore}%</Text>
                    </View>
                  </View>
                  <View style={styles.jobInfo}>
                    <View>
                      <Text style={styles.jobTitle}>{job.title}</Text>
                      <Text style={styles.jobCompany}>{job.company}</Text>
                    </View>
                    <View style={styles.jobMeta}>
                      <View style={styles.jobMetaItem}>
                        <Text style={styles.jobMetaIcon}>📍</Text>
                        <Text style={styles.jobMetaText}>{job.location}</Text>
                      </View>
                      <View style={styles.jobMetaItem}>
                        <Text style={styles.jobMetaIcon}>⏰</Text>
                        <Text style={styles.jobMetaText}>{job.type}</Text>
                      </View>
                      <View style={styles.jobMetaItem}>
                        <Text style={styles.jobMetaIcon}>💰</Text>
                        <Text style={styles.jobMetaText}>{job.salary}</Text>
                      </View>
                    </View>
                    <Text style={styles.reasonText}>"{job.reason}"</Text>
                    <View style={styles.jobFooter}>
                      <Text style={styles.postedText}>Posted {job.posted}</Text>
                      <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>Apply Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Recommended groups */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Groups</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.groupsList}>
            {recommendedGroups.map(group => (
              <TouchableOpacity key={group.id} style={styles.groupCard}>
                <View style={styles.groupHeader}>
                  <View style={[styles.groupLogo, { backgroundColor: group.color === 'bg-purple-100' ? '#F3E8FF' : 
                                                      group.color === 'bg-blue-100' ? '#DBEAFE' : '#D1FAE5' }]}>
                    <Text style={styles.groupLogoText}>{group.image}</Text>
                    <View style={styles.matchScore}>
                      <Text style={styles.matchScoreText}>{group.matchScore}%</Text>
                    </View>
                  </View>
                  <View style={styles.groupInfo}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.groupMembers}>{group.members} members</Text>
                    <Text style={styles.reasonText}>"{group.reason}"</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
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
  },
  menuIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  banner: {
    backgroundColor: '#4F46E5',
    padding: 16,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerIconText: {
    fontSize: 24,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
  },
  viewAllText: {
    fontSize: 14,
    color: '#2563EB',
  },
  professionalsList: {
    gap: 12,
  },
  professionalCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  professionalHeader: {
    flexDirection: 'row',
  },
  professionalAvatar: {
    width: 56,
    height: 56,
    backgroundColor: '#DBEAFE',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  professionalAvatarText: {
    fontSize: 24,
  },
  matchScore: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#10B981',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchScoreText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  professionalInfo: {
    flex: 1,
  },
  professionalTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  professionalProfession: {
    fontSize: 14,
    color: '#6B7280',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 16,
    color: '#F59E0B',
  },
  ratingText: {
    fontSize: 14,
    color: '#F59E0B',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  professionalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  reasonText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  professionalActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 14,
  },
  jobsList: {
    gap: 12,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  jobHeader: {
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
  jobLogoText: {
    fontSize: 24,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  jobCompany: {
    fontSize: 14,
    color: '#6B7280',
  },
  jobMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  jobMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  jobMetaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  jobMetaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  postedText: {
    fontSize: 12,
    color: '#6B7280',
  },
  applyButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 14,
  },
  groupsList: {
    gap: 12,
  },
  groupCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  groupHeader: {
    flexDirection: 'row',
  },
  groupLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  groupLogoText: {
    fontSize: 24,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  groupMembers: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
});

export default AIRecommendationsScreen;
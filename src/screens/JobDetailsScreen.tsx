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
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  JobDetails: { id: number };
  JobApplication: { jobId: number };
  JobApplicationSuccess: undefined;
};

type JobDetailsRouteProp = RouteProp<RootStackParamList, 'JobDetails'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ContactPerson {
  name: string;
  title: string;
  email: string;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  deadline: string;
  logo: string;
  about: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  contactPerson: ContactPerson;
}

const JobDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<JobDetailsRouteProp>();
  const { id } = route.params;

  // This should be replaced with actual user role check
  const isRecruiter = false;

  const handleApply = () => {
    navigation.navigate('JobApplication', { jobId: id });
  };

  const handleViewApplications = () => {
    navigation.navigate('JobApplicationsList', { jobId: id });
  };

  // Sample job data
  const job: Job = {
    id: 1,
    title: 'Senior Pediatrician',
    company: 'Kampala Children\'s Hospital',
    location: 'Kampala, Uganda',
    type: 'Full-time',
    salary: 'UGX 5M - 7M monthly',
    posted: 'July 3, 2023 (2 days ago)',
    deadline: 'July 31, 2023',
    logo: '🏥',
    about: 'Kampala Children\'s Hospital is a leading pediatric healthcare facility in Uganda, providing comprehensive medical care for children from birth through adolescence. Our state-of-the-art facility is equipped with the latest medical technology and staffed by experienced healthcare professionals dedicated to providing the highest quality care.',
    description: 'We are seeking an experienced and compassionate Senior Pediatrician to join our growing team. The ideal candidate will have extensive experience in pediatric care, strong diagnostic skills, and a commitment to providing exceptional patient care. This is an opportunity to work in a collaborative environment with a team of dedicated healthcare professionals.',
    responsibilities: [
      'Provide comprehensive medical care to pediatric patients',
      'Diagnose and treat a wide range of pediatric conditions',
      'Develop and implement treatment plans',
      'Collaborate with other healthcare professionals',
      'Maintain accurate and detailed patient records',
      'Participate in hospital rounds and case discussions',
      'Mentor junior doctors and medical students',
      'Stay updated with the latest developments in pediatric medicine'
    ],
    requirements: [
      'Medical degree from an accredited institution',
      'Completed residency in Pediatrics',
      'At least 5 years of experience as a practicing pediatrician',
      'Valid medical license in Uganda',
      'Strong diagnostic and clinical skills',
      'Excellent communication and interpersonal skills',
      'Ability to work in a fast-paced environment',
      'Commitment to continuous professional development'
    ],
    benefits: [
      'Competitive salary package',
      'Medical and dental coverage',
      'Professional development opportunities',
      'Collaborative work environment',
      'Modern facilities and equipment',
      'Opportunities for research and publication'
    ],
    contactPerson: {
      name: 'Dr. Elizabeth Nambi',
      title: 'Medical Director',
      email: 'recruitment@kch.ug'
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
          <Text style={styles.headerTitle}>Job Details</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>↗</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Job header */}
      <View style={styles.jobHeader}>
        <View style={styles.jobHeaderContent}>
          <View style={styles.jobLogo}>
            <Text style={styles.jobLogoText}>{job.logo}</Text>
          </View>
          <View style={styles.jobHeaderInfo}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.companyName}>{job.company}</Text>
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
          </View>
        </View>
      </View>
      
      {/* Job details */}
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          {/* About company */}
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>About the Company</Text>
            <Text style={styles.sectionText}>{job.about}</Text>
          </View>
          
          {/* Job description */}
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Job Description</Text>
            <Text style={styles.sectionText}>{job.description}</Text>
          </View>
          
          {/* Responsibilities */}
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Responsibilities</Text>
            {job.responsibilities.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            ))}
          </View>
          
          {/* Requirements */}
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            {job.requirements.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            ))}
          </View>
          
          {/* Benefits */}
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            {job.benefits.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            ))}
          </View>
          
          {/* Additional information */}
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            <View style={styles.additionalInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📅</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Posted on</Text>
                  <Text style={styles.infoValue}>{job.posted}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>⏰</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Application Deadline</Text>
                  <Text style={styles.infoValue}>{job.deadline}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>👤</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Contact Person</Text>
                  <Text style={styles.infoValue}>{job.contactPerson.name}, {job.contactPerson.title}</Text>
                  <Text style={styles.infoValue}>{job.contactPerson.email}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
        
        {isRecruiter && (
          <TouchableOpacity
            style={styles.viewApplicationsButton}
            onPress={handleViewApplications}
          >
            <Text style={styles.viewApplicationsButtonText}>View Applications</Text>
          </TouchableOpacity>
        )}
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
    marginLeft: 8,
  },
  shareButton: {
    marginLeft: 'auto',
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  shareButtonText: {
    fontSize: 20,
    color: '#374151',
  },
  jobHeader: {
    backgroundColor: 'white',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  jobHeaderContent: {
    flexDirection: 'row',
  },
  jobLogo: {
    width: 64,
    height: 64,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  jobLogoText: {
    fontSize: 32,
  },
  jobHeaderInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  companyName: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 4,
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
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionContent: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 8,
  },
  listItemText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  additionalInfo: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  infoValue: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  actionButtons: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  viewApplicationsButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewApplicationsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default JobDetailsScreen;
'use client';
import React from "react"
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
  JobDetails: { id: number };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Applicant {
  name: string;
  title: string;
  avatar: string;
  rating: number;
}

interface Application {
  id: number;
  applicant: Applicant;
  job: string;
  applied: string;
  status: string;
  matched: string;
}

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  posted: string;
  expires: string;
  status: string;
  applications: number;
  newApplications: number;
}

interface Recruiter {
  name: string;
  company: string;
  role: string;
  avatar: string;
}

const RecruiterDashboardScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const fontFamily = 'Poppins, sans-serif';
  
  // Sample recruiter data
  const recruiter: Recruiter = {
    name: 'Sarah Namuwenge',
    company: 'Kampala Children\'s Hospital',
    role: 'HR Manager',
    avatar: '👩🏾‍💼'
  };
  
  // Sample posted jobs
  const postedJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Pediatrician',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      posted: 'Jul 3, 2023',
      expires: 'Jul 31, 2023',
      status: 'active',
      applications: 12,
      newApplications: 3
    },
    {
      id: 2,
      title: 'Pediatric Nurse',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      posted: 'Jun 25, 2023',
      expires: 'Jul 25, 2023',
      status: 'active',
      applications: 24,
      newApplications: 0
    },
    {
      id: 3,
      title: 'Medical Records Officer',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      posted: 'Jun 10, 2023',
      expires: 'Jul 10, 2023',
      status: 'closing soon',
      applications: 18,
      newApplications: 2
    },
    {
      id: 4,
      title: 'Hospital Administrator',
      location: 'Kampala, Uganda',
      type: 'Full-time',
      posted: 'May 15, 2023',
      expires: 'Jun 15, 2023',
      status: 'closed',
      applications: 32,
      newApplications: 0
    }
  ];
  
  // Sample recent applications
  const recentApplications: Application[] = [
    {
      id: 1,
      applicant: {
        name: 'Dr. John Okello',
        title: 'Pediatrician',
        avatar: '👨🏾‍⚕️',
        rating: 4.8
      },
      job: 'Senior Pediatrician',
      applied: '2 hours ago',
      status: 'new',
      matched: '92% match'
    },
    {
      id: 2,
      applicant: {
        name: 'Dr. Amina Hassan',
        title: 'Pediatrician',
        avatar: '👩🏾‍⚕️',
        rating: 4.7
      },
      job: 'Senior Pediatrician',
      applied: '5 hours ago',
      status: 'new',
      matched: '88% match'
    },
    {
      id: 3,
      applicant: {
        name: 'Dr. Robert Kigongo',
        title: 'Pediatrician',
        avatar: '👨🏾‍⚕️',
        rating: 4.5
      },
      job: 'Senior Pediatrician',
      applied: '1 day ago',
      status: 'reviewed',
      matched: '85% match'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{recruiter.avatar}</Text>
            </View>
            <View>
              <Text style={styles.name}>{recruiter.name}</Text>
              <Text style={styles.company}>{recruiter.company}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Dashboard stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, styles.activeJobsCard]}>
            <Text style={styles.statLabel}>Active Jobs</Text>
            <Text style={[styles.statValue, styles.activeJobsValue]}>3</Text>
          </View>
          <View style={[styles.statCard, styles.applicationsCard]}>
            <Text style={styles.statLabel}>Applications</Text>
            <Text style={[styles.statValue, styles.applicationsValue]}>54</Text>
          </View>
          <View style={[styles.statCard, styles.newTodayCard]}>
            <Text style={styles.statLabel}>New Today</Text>
            <Text style={[styles.statValue, styles.newTodayValue]}>5</Text>
          </View>
        </View>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Action buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonIcon}>➕</Text>
            <Text style={styles.primaryButtonText}>Post New Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonIcon}>📊</Text>
            <Text style={styles.secondaryButtonText}>View Reports</Text>
          </TouchableOpacity>
        </View>
        
        {/* Posted jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Posted Jobs</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.jobsList}>
            {postedJobs.slice(0, 3).map(job => (
              <View key={job.id} style={styles.jobCard}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <View style={styles.jobLocation}>
                      <Text style={styles.locationIcon}>📍</Text>
                      <Text style={styles.locationText}>{job.location} • {job.type}</Text>
                    </View>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    job.status === 'active' && styles.activeBadge,
                    job.status === 'closing soon' && styles.closingSoonBadge,
                    job.status === 'closed' && styles.closedBadge
                  ]}>
                    <Text style={[
                      styles.statusText,
                      job.status === 'active' && styles.activeStatusText,
                      job.status === 'closing soon' && styles.closingSoonStatusText,
                      job.status === 'closed' && styles.closedStatusText
                    ]}>
                      {job.status === 'active' ? 'Active' : 
                       job.status === 'closing soon' ? 'Closing Soon' : 
                       'Closed'}
                    </Text>
                  </View>
                </View>
                <View style={styles.jobFooter}>
                  <View style={styles.applicationsInfo}>
                    <View style={styles.applicationsCount}>
                      <Text style={styles.applicationsIcon}>👥</Text>
                      <Text style={styles.applicationsText}>{job.applications}</Text>
                    </View>
                    {job.newApplications > 0 && (
                      <View style={styles.newApplicationsBadge}>
                        <Text style={styles.newApplicationsText}>+{job.newApplications} new</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.jobDates}>
                    Posted: {job.posted} • Expires: {job.expires}
                  </Text>
                </View>
                <View style={styles.jobActions}>
                  <TouchableOpacity 
                    style={styles.jobActionButton}
                    onPress={() => navigation.navigate('JobDetails', { id: job.id })}
                  >
                    <Text style={styles.jobActionText}>View Applications</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.jobActionButton}>
                    <Text style={styles.jobActionText}>Edit Job</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Recent applications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Applications</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.applicationsList}>
            {recentApplications.map(application => (
              <View key={application.id} style={styles.applicationCard}>
                <View style={styles.applicationHeader}>
                  <View style={styles.applicantAvatar}>
                    <Text style={styles.applicantAvatarText}>{application.applicant.avatar}</Text>
                  </View>
                  <View style={styles.applicantInfo}>
                    <View style={styles.applicantHeader}>
                      <View>
                        <Text style={styles.applicantName}>{application.applicant.name}</Text>
                        <Text style={styles.applicantTitle}>{application.applicant.title}</Text>
                      </View>
                      {application.status === 'new' && (
                        <View style={styles.newBadge}>
                          <Text style={styles.newBadgeText}>New</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.applicationDetails}>
                      <Text style={styles.jobAppliedFor}>{application.job}</Text>
                      <Text style={styles.applicationMeta}>
                        Applied {application.applied} • {application.matched}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
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
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#DBEAFE',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  company: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 24,
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeJobsCard: {
    backgroundColor: '#EFF6FF',
  },
  applicationsCard: {
    backgroundColor: '#ECFDF5',
  },
  newTodayCard: {
    backgroundColor: '#FFFBEB',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  activeJobsValue: {
    color: '#1E40AF',
  },
  applicationsValue: {
    color: '#065F46',
  },
  newTodayValue: {
    color: '#92400E',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  primaryButtonIcon: {
    fontSize: 20,
    color: 'white',
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonIcon: {
    fontSize: 20,
    color: '#374151',
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
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
  jobsList: {
    gap: 12,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
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
  jobLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#D1FAE5',
  },
  closingSoonBadge: {
    backgroundColor: '#FEF3C7',
  },
  closedBadge: {
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeStatusText: {
    color: '#065F46',
  },
  closingSoonStatusText: {
    color: '#92400E',
  },
  closedStatusText: {
    color: '#374151',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  applicationsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applicationsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  applicationsIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  applicationsText: {
    fontSize: 14,
    color: '#374151',
  },
  newApplicationsBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  newApplicationsText: {
    fontSize: 12,
    color: 'white',
  },
  jobDates: {
    fontSize: 12,
    color: '#6B7280',
  },
  jobActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  jobActionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  jobActionText: {
    fontSize: 14,
    color: '#374151',
  },
  applicationsList: {
    gap: 12,
  },
  applicationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  applicationHeader: {
    flexDirection: 'row',
  },
  applicantAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#DBEAFE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  applicantAvatarText: {
    fontSize: 24,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  applicantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  applicantTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  newBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    fontSize: 12,
    color: '#DC2626',
  },
  applicationDetails: {
    marginTop: 8,
  },
  jobAppliedFor: {
    fontSize: 14,
    color: '#374151',
  },
  applicationMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default RecruiterDashboardScreen;
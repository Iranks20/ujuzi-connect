import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ProfessionalProfile: { professionalId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Review {
  id: string;
  patientName: string;
  patientImage: string;
  rating: number;
  date: string;
  comment: string;
  medicalReport?: {
    type: string;
    date: string;
    description: string;
  };
}

const { width } = Dimensions.get('window');

const DoctorReviewsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedTab, setSelectedTab] = useState<'reviews' | 'reports'>('reviews');

  const reviews: Review[] = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      date: '2024-03-15',
      comment: 'Dr. Smith was very professional and thorough. The diagnosis was accurate and the treatment plan was clear.',
      medicalReport: {
        type: 'Blood Test',
        date: '2024-03-15',
        description: 'Complete blood count and metabolic panel'
      }
    },
    {
      id: '2',
      patientName: 'Michael Brown',
      patientImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 4,
      date: '2024-03-10',
      comment: 'Great bedside manner and very knowledgeable. The wait time was a bit long though.',
      medicalReport: {
        type: 'X-Ray',
        date: '2024-03-10',
        description: 'Chest X-ray for respiratory symptoms'
      }
    },
    {
      id: '3',
      patientName: 'Emily Davis',
      patientImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 5,
      date: '2024-03-05',
      comment: 'Excellent doctor! Very attentive and caring. The follow-up care was exceptional.',
      medicalReport: {
        type: 'MRI',
        date: '2024-03-05',
        description: 'Brain MRI for neurological symptoms'
      }
    }
  ];

  const renderReview = (review: Review) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image
          source={{ uri: review.patientImage }}
          style={styles.patientImage}
        />
        <View style={styles.reviewInfo}>
          <Text style={styles.patientName}>{review.patientName}</Text>
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <Text
                key={index}
                style={[
                  styles.star,
                  index < review.rating ? styles.starFilled : styles.starEmpty
                ]}
              >
                ★
              </Text>
            ))}
          </View>
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
      </View>
      
      <Text style={styles.reviewComment}>{review.comment}</Text>
      
      {review.medicalReport && (
        <TouchableOpacity style={styles.medicalReportCard}>
          <View style={styles.medicalReportHeader}>
            <Text style={styles.medicalReportType}>{review.medicalReport.type}</Text>
            <Text style={styles.medicalReportDate}>{review.medicalReport.date}</Text>
          </View>
          <Text style={styles.medicalReportDescription}>
            {review.medicalReport.description}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews & Reports</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'reviews' && styles.tabActive
          ]}
          onPress={() => setSelectedTab('reviews')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'reviews' && styles.tabTextActive
          ]}>
            Reviews
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'reports' && styles.tabActive
          ]}
          onPress={() => setSelectedTab('reports')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'reports' && styles.tabTextActive
          ]}>
            Medical Reports
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {reviews.map(renderReview)}
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
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  headerRight: {
    width: 40,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#1e3a8a',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1e3a8a',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  patientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  star: {
    fontSize: 16,
    marginRight: 2,
  },
  starFilled: {
    color: '#F59E0B',
  },
  starEmpty: {
    color: '#D1D5DB',
  },
  reviewDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  reviewComment: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },
  medicalReportCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
  },
  medicalReportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  medicalReportType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  medicalReportDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  medicalReportDescription: {
    fontSize: 14,
    color: '#4B5563',
  },
});

export default DoctorReviewsScreen; 
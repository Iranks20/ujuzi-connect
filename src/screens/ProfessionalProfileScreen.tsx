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
  Explore: undefined;
  Booking: undefined;
  Chat: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Service {
  name: string;
  price: string;
  duration: string;
}

interface Availability {
  day: string;
  hours: string;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

interface Professional {
  id: number;
  name: string;
  profession: string;
  specialization: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  experience: string;
  languages: string[];
  about: string;
  education: Education[];
  services: Service[];
  availability: Availability[];
  recentReviews: Review[];
}

const ProfessionalProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // Sample professional data
  const professional: Professional = {
    id: 1,
    name: 'Dr. Sarah Mukasa',
    profession: 'Pediatrician',
    specialization: 'Child Health & Development',
    rating: 4.9,
    reviews: 124,
    price: 'UGX 50,000',
    location: 'Kampala, Uganda',
    experience: '8 years',
    languages: ['English', 'Luganda', 'Swahili'],
    about: 'Dr. Sarah Mukasa is a board-certified pediatrician with over 8 years of experience in child healthcare. She specializes in early childhood development, preventive care, and managing chronic pediatric conditions. Dr. Mukasa is passionate about providing accessible healthcare to children across Uganda.',
    education: [
      { degree: 'Doctor of Medicine', institution: 'Makerere University', year: '2012' },
      { degree: 'Pediatric Residency', institution: 'Mulago Hospital', year: '2015' },
      { degree: 'Fellowship in Child Development', institution: 'Nairobi Children\'s Hospital', year: '2016' }
    ],
    services: [
      { name: 'General Consultation', price: 'UGX 50,000', duration: '30 min' },
      { name: 'Developmental Assessment', price: 'UGX 75,000', duration: '45 min' },
      { name: 'Follow-up Visit', price: 'UGX 35,000', duration: '20 min' }
    ],
    availability: [
      { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM - 1:00 PM' },
      { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Friday', hours: '9:00 AM - 5:00 PM' }
    ],
    recentReviews: [
      { 
        id: 1, 
        user: 'Jane K.', 
        rating: 5, 
        date: '2 weeks ago',
        comment: 'Dr. Mukasa was incredibly patient and thorough with my son. She explained everything clearly and made us feel at ease. Highly recommend!'
      },
      { 
        id: 2, 
        user: 'Robert M.', 
        rating: 5, 
        date: '1 month ago',
        comment: 'Excellent doctor! She diagnosed my daughter\'s condition quickly and provided effective treatment. Very professional and knowledgeable.'
      },
      { 
        id: 3, 
        user: 'Grace T.', 
        rating: 4, 
        date: '2 months ago',
        comment: 'Very good experience. Dr. Mukasa is great with kids and takes time to answer all questions. The only issue was a bit of waiting time.'
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        {/* Background header */}
        <View style={styles.headerBackground} />
        
        {/* Back button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Explore')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        {/* Share button */}
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>↗</Text>
        </TouchableOpacity>
        
        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            {/* Profile image */}
            <View style={styles.profileImage}>
              <Text style={styles.profileEmoji}>👩🏾‍⚕️</Text>
            </View>
            
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{professional.name}</Text>
                <Text style={styles.verifiedBadge}>✓</Text>
              </View>
              <Text style={styles.profession}>{professional.profession}</Text>
              <Text style={styles.specialization}>{professional.specialization}</Text>
              
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingText}>{professional.rating}</Text>
                <Text style={styles.reviewsText}>({professional.reviews} reviews)</Text>
              </View>
            </View>
          </View>
          
          {/* Quick info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoText}>{professional.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>⏱️</Text>
              <Text style={styles.infoText}>{professional.experience}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🌐</Text>
              <Text style={styles.infoText}>{professional.languages.join(', ')}</Text>
            </View>
          </View>
          
          {/* Action buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => navigation.navigate('Booking')}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.chatButton}
              onPress={() => navigation.navigate('Chat')}
            >
              <Text style={styles.chatButtonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Main content */}
      <ScrollView style={styles.content}>
        {/* About section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{professional.about}</Text>
        </View>
        
        {/* Education section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {professional.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.educationDot} />
              <View>
                <Text style={styles.educationDegree}>{edu.degree}</Text>
                <Text style={styles.educationDetails}>{edu.institution}, {edu.year}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Services section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          {professional.services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
              </View>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </View>
          ))}
        </View>
        
        {/* Availability section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.availabilityCard}>
            {professional.availability.map((slot, index) => (
              <View key={index} style={styles.availabilityItem}>
                <Text style={styles.availabilityDay}>{slot.day}</Text>
                <Text style={styles.availabilityHours}>{slot.hours}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Reviews section */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {professional.recentReviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View>
                  <Text style={styles.reviewUser}>{review.user}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewRating}>
                  <Text style={styles.reviewRatingText}>{review.rating}</Text>
                  <Text style={styles.reviewRatingStar}>★</Text>
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
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
    position: 'relative',
  },
  headerBackground: {
    height: 160,
    backgroundColor: '#1e3a8a',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
  },
  shareButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 20,
  },
  profileCard: {
    position: 'absolute',
    top: 96,
    left: 24,
    right: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 96,
    height: 96,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileEmoji: {
    fontSize: 48,
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  verifiedBadge: {
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 4,
  },
  profession: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 2,
  },
  specialization: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingStar: {
    fontSize: 16,
    color: '#F59E0B',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  infoIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  chatButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e3a8a',
  },
  chatButtonText: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    marginTop: 200,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  educationItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  educationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1e3a8a',
    marginTop: 6,
    marginRight: 12,
  },
  educationDegree: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  educationDetails: {
    fontSize: 14,
    color: '#4B5563',
  },
  serviceCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  availabilityCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  availabilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  availabilityDay: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  availabilityHours: {
    fontSize: 14,
    color: '#6B7280',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e3a8a',
  },
  reviewCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginRight: 4,
  },
  reviewRatingStar: {
    fontSize: 16,
    color: '#F59E0B',
  },
  reviewComment: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});

export default ProfessionalProfileScreen;
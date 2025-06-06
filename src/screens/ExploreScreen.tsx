'use client';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { ExploreStackParamList, RootTabParamList } from '../components/BottomNavigation';

type NavigationProp = NativeStackNavigationProp<ExploreStackParamList>;
type TabNavigationProp = BottomTabNavigationProp<RootTabParamList>;

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  subCategories: {
    id: number;
    name: string;
    icon: string;
  }[];
}

interface Professional {
  id: number;
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  verified: boolean;
}

const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const tabNavigation = useNavigation<TabNavigationProp>();

  // Updated categories with more fields
  const categories: Category[] = [
    {
      id: 1,
      name: 'Healthcare',
      icon: '🏥',
      color: '#dbeafe',
      subCategories: [
        { id: 1, name: 'Doctors', icon: '👨‍⚕️' },
        { id: 2, name: 'Nurses', icon: '👩‍⚕️' },
        { id: 3, name: 'Pediatricians', icon: '👶' },
        { id: 4, name: 'Dentists', icon: '🦷' },
        { id: 5, name: 'Psychologists', icon: '🧠' }
      ]
    },
    {
      id: 2,
      name: 'Technology',
      icon: '💻',
      color: '#f3e8ff',
      subCategories: [
        { id: 1, name: 'Software Engineers', icon: '👨‍💻' },
        { id: 2, name: 'Data Scientists', icon: '📊' },
        { id: 3, name: 'UI/UX Designers', icon: '🎨' },
        { id: 4, name: 'DevOps Engineers', icon: '⚙️' },
        { id: 5, name: 'Mobile Developers', icon: '📱' }
      ]
    },
    {
      id: 3,
      name: 'Education',
      icon: '📚',
      color: '#dcfce7',
      subCategories: [
        { id: 1, name: 'Tutors', icon: '👨‍🏫' },
        { id: 2, name: 'Language Teachers', icon: '🗣️' },
        { id: 3, name: 'Music Teachers', icon: '🎵' },
        { id: 4, name: 'Sports Coaches', icon: '⚽' }
      ]
    },
    {
      id: 4,
      name: 'Business',
      icon: '💼',
      color: '#fef9c3',
      subCategories: [
        { id: 1, name: 'Accountants', icon: '📊' },
        { id: 2, name: 'Lawyers', icon: '⚖️' },
        { id: 3, name: 'Consultants', icon: '💡' },
        { id: 4, name: 'Financial Advisors', icon: '💰' }
      ]
    },
    {
      id: 5,
      name: 'Engineering',
      icon: '⚡',
      color: '#fee2e2',
      subCategories: [
        { id: 1, name: 'Civil Engineers', icon: '🏗️' },
        { id: 2, name: 'Mechanical Engineers', icon: '🔧' },
        { id: 3, name: 'Electrical Engineers', icon: '⚡' },
        { id: 4, name: 'Architects', icon: '🏛️' }
      ]
    },
    {
      id: 6,
      name: 'Creative',
      icon: '🎨',
      color: '#fce7f3',
      subCategories: [
        { id: 1, name: 'Graphic Designers', icon: '🎨' },
        { id: 2, name: 'Photographers', icon: '📸' },
        { id: 3, name: 'Content Writers', icon: '✍️' },
        { id: 4, name: 'Video Editors', icon: '🎬' }
      ]
    },
    {
      id: 7,
      name: 'Wellness',
      icon: '🧘',
      color: '#e0e7ff',
      subCategories: [
        { id: 1, name: 'Fitness Trainers', icon: '💪' },
        { id: 2, name: 'Yoga Instructors', icon: '��' },
        { id: 3, name: 'Nutritionists', icon: '🥗' },
        { id: 4, name: 'Life Coaches', icon: '🎯' }
      ]
    }
  ];

  // Sample featured professionals
  const featuredProfessionals: Professional[] = [
    {
      id: 1,
      name: 'Dr. Sarah Mukasa',
      profession: 'Pediatrician',
      rating: 4.9,
      reviews: 124,
      price: 'UGX 50,000',
      image: '👩🏾‍⚕️',
      verified: true
    },
    {
      id: 2,
      name: 'Adv. John Okello',
      profession: 'Corporate Lawyer',
      rating: 4.8,
      reviews: 98,
      price: 'UGX 75,000',
      image: '👨🏾‍⚖️',
      verified: true
    },
    {
      id: 3,
      name: 'Eng. David Ochieng',
      profession: 'Civil Engineer',
      rating: 4.7,
      reviews: 56,
      price: 'UGX 60,000',
      image: '👷🏾‍♂️',
      verified: true
    }
  ];

  // Sample recommended professionals
  const recommendedProfessionals: Professional[] = [
    {
      id: 4,
      name: 'Dr. Michael Ssemakula',
      profession: 'Psychologist',
      rating: 4.9,
      reviews: 87,
      price: 'UGX 45,000',
      image: '👨🏾‍💼',
      verified: true
    },
    {
      id: 5,
      name: 'Prof. Grace Nakimuli',
      profession: 'Mathematics Tutor',
      rating: 4.8,
      reviews: 112,
      price: 'UGX 35,000',
      image: '👩🏾‍🏫',
      verified: true
    }
  ];

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Category', {
        category: item.name,
        icon: item.icon,
        color: item.color,
        subCategories: item.subCategories
      })}
    >
      <View style={styles.categoryIcon}>
        <Text style={styles.categoryIconText}>{item.icon}</Text>
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryCount}>{item.subCategories.length} categories</Text>
    </TouchableOpacity>
  );

  const renderProfessional = ({ item }: { item: Professional }) => (
    <TouchableOpacity 
      style={styles.professionalCard}
      onPress={() => navigation.navigate('ProfessionalProfile', { id: item.id })}
    >
      <View style={styles.professionalContent}>
        <View style={styles.professionalImage}>
          <Text style={styles.professionalEmoji}>{item.image}</Text>
        </View>
        <View style={styles.professionalInfo}>
          <View style={styles.professionalHeader}>
            <Text style={styles.professionalName}>{item.name}</Text>
            {item.verified && (
              <Text style={styles.verifiedBadge}>✓</Text>
            )}
          </View>
          <Text style={styles.professionalTitle}>{item.profession}</Text>
          <View style={styles.professionalFooter}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingStar}>★</Text>
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewsText}>({item.reviews})</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{item.price}</Text>
              <Text style={styles.priceUnit}>/session</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>U</Text>
            </View>
            <Text style={styles.logoTitle}>Ujuzi</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationButton}>
              <Text style={styles.notificationIcon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => tabNavigation.navigate('Account')}
            >
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for professionals..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Filter chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          <TouchableOpacity style={[styles.filterChip, styles.activeFilterChip]}>
            <Text style={[styles.filterChipText, styles.activeFilterChipText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Top Rated</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Available Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Price</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Main content */}
      <ScrollView style={styles.content}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Fields</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((item) => renderCategory({ item }))}
          </View>
        </View>

        {/* Featured Professionals */}
        <View style={[styles.section, styles.featuredSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Professionals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProfessionals}
            renderItem={renderProfessional}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            style={styles.professionalsList}
          />
        </View>

        {/* Recommended for You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recommendedProfessionals}
            renderItem={renderProfessional}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            style={styles.professionalsList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    marginTop: -30,
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    backgroundColor: '#1e3a8a',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  notificationIcon: {
    fontSize: 20,
  },
  profileButton: {
    width: 40,
    height: 40,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  activeFilterChip: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  activeFilterChipText: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 10,
    paddingTop: 24,
  },
  featuredSection: {
    paddingTop: -5,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e3a8a',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 8,
  },
  categoryItem: {
    width: '25%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  categoryIcon: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  professionalsList: {
    gap: 16,
  },
  professionalCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  professionalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  professionalImage: {
    width: 64,
    height: 64,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  professionalEmoji: {
    fontSize: 32,
  },
  professionalInfo: {
    flex: 1,
  },
  professionalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  verifiedBadge: {
    fontSize: 14,
    color: '#3B82F6',
    marginLeft: 4,
  },
  professionalTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  professionalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStar: {
    fontSize: 14,
    color: '#F59E0B',
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 2,
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  priceUnit: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
});

export default ExploreScreen;
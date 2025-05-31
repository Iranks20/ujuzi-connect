import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Category: {
    category: string;
    icon: string;
    color: string;
    subCategories: {
      id: number;
      name: string;
      icon: string;
    }[];
  };
  ProfessionalProfile: { id: number };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

interface Professional {
  id: number;
  name: string;
  profession: string;
  specialization: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  verified: boolean;
  location: string;
  experience: string;
}

interface Filter {
  id: string;
  label: string;
  active: boolean;
}

const { width } = Dimensions.get('window');

const CategoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CategoryScreenRouteProp>();
  const { category, icon, color, subCategories } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategories[0].id);

  // Sample professionals for the selected category
  const professionals: Professional[] = [
    {
      id: 1,
      name: 'Dr. Sarah Mukasa',
      profession: 'Pediatrician',
      specialization: 'Child Health & Development',
      rating: 4.9,
      reviews: 124,
      price: 'UGX 50,000',
      image: '👩🏾‍⚕️',
      verified: true,
      location: 'Kampala',
      experience: '8 years'
    },
    {
      id: 2,
      name: 'Dr. Michael Ssemakula',
      profession: 'General Practitioner',
      specialization: 'Family Medicine',
      rating: 4.8,
      reviews: 98,
      price: 'UGX 45,000',
      image: '👨🏾‍⚕️',
      verified: true,
      location: 'Entebbe',
      experience: '5 years'
    },
    {
      id: 3,
      name: 'Dr. Grace Nakimuli',
      profession: 'Dermatologist',
      specialization: 'Skin & Hair',
      rating: 4.7,
      reviews: 87,
      price: 'UGX 60,000',
      image: '👩🏾‍⚕️',
      verified: true,
      location: 'Kampala',
      experience: '6 years'
    }
  ];

  // Filter options
  const filters: Filter[] = [
    { id: 'all', label: 'All', active: true },
    { id: 'pediatrician', label: 'Pediatrician', active: false },
    { id: 'gp', label: 'General Practitioner', active: false },
    { id: 'dermatologist', label: 'Dermatologist', active: false },
    { id: 'cardiology', label: 'Cardiology', active: false },
    { id: 'neurology', label: 'Neurology', active: false }
  ];

  const renderSubCategory = ({ item }: { item: { id: number; name: string; icon: string } }) => (
    <TouchableOpacity 
      style={[
        styles.subCategoryCard,
        selectedSubCategory === item.id && styles.selectedSubCategoryCard
      ]}
      onPress={() => {
        setSelectedSubCategory(item.id);
        console.log('Selected subcategory:', item.name);
      }}
    >
      <Text style={[
        styles.subCategoryIcon,
        selectedSubCategory === item.id && styles.selectedSubCategoryIcon
      ]}>{item.icon}</Text>
      <Text style={[
        styles.subCategoryName,
        selectedSubCategory === item.id && styles.selectedSubCategoryName
      ]}>{item.name}</Text>
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
          <Text style={styles.professionalSpecialization}>{item.specialization}</Text>
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
          <View style={styles.professionalMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{item.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱️</Text>
              <Text style={styles.metaText}>{item.experience}</Text>
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={[styles.categoryIcon, { backgroundColor: color }]}>
            <Text style={styles.categoryIconText}>{icon}</Text>
          </View>
          <Text style={styles.headerTitle}>{category}</Text>
        </View>
      </View>

      {/* Subcategories */}
      <View style={styles.subCategoriesSection}>
        <Text style={styles.sectionTitle}>Select Category</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subCategoriesScrollContent}
        >
          {subCategories.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={[
                styles.subCategoryCard,
                selectedSubCategory === item.id && styles.selectedSubCategoryCard
              ]}
              onPress={() => {
                setSelectedSubCategory(item.id);
                console.log('Selected subcategory:', item.name);
              }}
            >
              <Text style={[
                styles.subCategoryIcon,
                selectedSubCategory === item.id && styles.selectedSubCategoryIcon
              ]}>{item.icon}</Text>
              <Text style={[
                styles.subCategoryName,
                selectedSubCategory === item.id && styles.selectedSubCategoryName
              ]}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.filterIcon}>⚡</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {showFilters && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                filter.active && styles.activeFilterChip
              ]}
            >
              <Text style={[
                styles.filterChipText,
                filter.active && styles.activeFilterChipText
              ]}>{filter.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Professionals List */}
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Professionals</Text>
          <FlatList
            data={professionals}
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
  },
  header: {
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#374151',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryIconText: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 20,
  },
  filtersContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#1e3a8a',
  },
  filterChipText: {
    fontSize: 14,
    color: '#374151',
  },
  activeFilterChipText: {
    color: 'white',
  },
  subCategoriesSection: {
    backgroundColor: 'white',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  subCategoriesScrollContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  subCategoryCard: {
    width: 100,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    marginRight: 8,
  },
  selectedSubCategoryCard: {
    backgroundColor: '#1e3a8a',
  },
  subCategoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  selectedSubCategoryIcon: {
    color: 'white',
  },
  subCategoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  selectedSubCategoryName: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    paddingHorizontal: 12,
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
  professionalSpecialization: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  professionalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
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
  professionalMeta: {
    flexDirection: 'row',
    marginTop: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaIcon: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default CategoryScreen; 
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ProfessionalProfile: { id: number };
  CategoryScreen: { category: string; icon: string; color: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'CategoryScreen'>;

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

const CategoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CategoryScreenRouteProp>();
  const { category, icon, color } = route.params;

  // Sample professionals for the selected category
  const professionals: Professional[] = [
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
      name: 'Dr. Michael Ssemakula',
      profession: 'General Practitioner',
      rating: 4.8,
      reviews: 98,
      price: 'UGX 45,000',
      image: '👨🏾‍⚕️',
      verified: true
    },
    {
      id: 3,
      name: 'Dr. Grace Nakimuli',
      profession: 'Dermatologist',
      rating: 4.7,
      reviews: 87,
      price: 'UGX 60,000',
      image: '👩🏾‍⚕️',
      verified: true
    }
  ];

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

      {/* Content */}
      <ScrollView style={styles.content}>
        <FlatList
          data={professionals}
          renderItem={renderProfessional}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          style={styles.professionalsList}
        />
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
    paddingTop: 48,
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
  content: {
    flex: 1,
    padding: 24,
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

export default CategoryScreen; 
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Category: { category: string; icon: string; color: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Specialization {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  doctorCount: number;
  averageRating: number;
  averagePrice: string;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const DoctorSpecializationScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const specializations: Specialization[] = [
    {
      id: 'pediatrics',
      name: 'Pediatrics',
      icon: '👶',
      color: '#DBEAFE',
      description: 'Child health and development',
      doctorCount: 45,
      averageRating: 4.8,
      averagePrice: 'UGX 50,000'
    },
    {
      id: 'cardiology',
      name: 'Cardiology',
      icon: '❤️',
      color: '#FEE2E2',
      description: 'Heart and cardiovascular system',
      doctorCount: 32,
      averageRating: 4.9,
      averagePrice: 'UGX 75,000'
    },
    {
      id: 'dermatology',
      name: 'Dermatology',
      icon: '🧬',
      color: '#FEF3C7',
      description: 'Skin, hair, and nails',
      doctorCount: 28,
      averageRating: 4.7,
      averagePrice: 'UGX 65,000'
    },
    {
      id: 'neurology',
      name: 'Neurology',
      icon: '🧠',
      color: '#D1FAE5',
      description: 'Brain and nervous system',
      doctorCount: 25,
      averageRating: 4.9,
      averagePrice: 'UGX 80,000'
    },
    {
      id: 'orthopedics',
      name: 'Orthopedics',
      icon: '🦴',
      color: '#E0E7FF',
      description: 'Bones and joints',
      doctorCount: 35,
      averageRating: 4.6,
      averagePrice: 'UGX 70,000'
    },
    {
      id: 'gynecology',
      name: 'Gynecology',
      icon: '👩',
      color: '#FCE7F3',
      description: 'Women\'s health',
      doctorCount: 40,
      averageRating: 4.8,
      averagePrice: 'UGX 60,000'
    }
  ];

  const renderSpecialization = ({ item }: { item: Specialization }) => (
    <TouchableOpacity 
      style={[styles.specializationCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('Category', {
        category: item.name,
        icon: item.icon,
        color: item.color
      })}
    >
      <View style={styles.specializationHeader}>
        <Text style={styles.specializationIcon}>{item.icon}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingText}>{item.averageRating}</Text>
        </View>
      </View>
      
      <Text style={styles.specializationName}>{item.name}</Text>
      <Text style={styles.specializationDescription}>{item.description}</Text>
      
      <View style={styles.specializationFooter}>
        <View style={styles.doctorCount}>
          <Text style={styles.doctorCountText}>{item.doctorCount}</Text>
          <Text style={styles.doctorCountLabel}>Doctors</Text>
        </View>
        <Text style={styles.averagePrice}>{item.averagePrice}</Text>
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
        <Text style={styles.headerTitle}>Doctor Specializations</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <FlatList
        data={specializations}
        renderItem={renderSpecialization}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
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
  content: {
    padding: 16,
  },
  specializationCard: {
    width: cardWidth,
    margin: 8,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  specializationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  specializationIcon: {
    fontSize: 32,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
  },
  specializationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  specializationDescription: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
  },
  specializationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorCount: {
    alignItems: 'center',
  },
  doctorCountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  doctorCountLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  averagePrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e3a8a',
  },
});

export default DoctorSpecializationScreen; 
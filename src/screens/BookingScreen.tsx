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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ProfessionalProfile: undefined;
  Payment: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Date {
  day: string;
  date: number;
  month: string;
  full: string;
  isToday: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface ConsultationMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface Professional {
  id: number;
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
}

const BookingScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(1);
  const [selectedMethodIndex, setSelectedMethodIndex] = useState(2);

  // Sample professional data
  const professional: Professional = {
    id: 1,
    name: 'Dr. Sarah Mukasa',
    profession: 'Pediatrician',
    rating: 4.9,
    reviews: 124,
    price: 'UGX 50,000',
    image: '👩🏾‍⚕️'
  };
  
  // Sample dates for the next 7 days
  const today = new Date();
  const dates: Date[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      full: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      isToday: i === 0
    };
  });
  
  // Sample time slots
  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: false },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false },
    { time: '05:00 PM', available: true }
  ];
  
  // Consultation methods
  const consultationMethods: ConsultationMethod[] = [
    { id: 'chat', name: 'Chat', icon: '💬', description: 'Text-based consultation' },
    { id: 'call', name: 'Voice Call', icon: '📞', description: 'Audio-only consultation' },
    { id: 'video', name: 'Video Call', icon: '📹', description: 'Face-to-face video consultation' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('ProfessionalProfile')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.content}>
        {/* Professional info */}
        <View style={styles.section}>
          <View style={styles.professionalCard}>
            <View style={styles.professionalInfo}>
              <View style={styles.professionalImage}>
                <Text style={styles.professionalEmoji}>{professional.image}</Text>
              </View>
              <View style={styles.professionalDetails}>
                <View style={styles.nameContainer}>
                  <Text style={styles.professionalName}>{professional.name}</Text>
                  <Text style={styles.verifiedBadge}>✓</Text>
                </View>
                <Text style={styles.professionalTitle}>{professional.profession}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingStar}>★</Text>
                  <Text style={styles.ratingText}>{professional.rating}</Text>
                  <Text style={styles.reviewsText}>({professional.reviews})</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{professional.price}</Text>
                <Text style={styles.priceUnit}>/session</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Date selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.datesContainer}
          >
            {dates.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCard,
                  index === selectedDateIndex && styles.selectedDateCard
                ]}
                onPress={() => setSelectedDateIndex(index)}
              >
                <Text style={[
                  styles.dateDay,
                  index === selectedDateIndex && styles.selectedDateText
                ]}>{date.day}</Text>
                <Text style={[
                  styles.dateNumber,
                  index === selectedDateIndex && styles.selectedDateText
                ]}>{date.date}</Text>
                <Text style={[
                  styles.dateMonth,
                  index === selectedDateIndex && styles.selectedDateText
                ]}>{date.month}</Text>
                {date.isToday && (
                  <Text style={[
                    styles.todayText,
                    index === selectedDateIndex && styles.selectedTodayText
                  ]}>Today</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Time selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeCard,
                  !slot.available && styles.unavailableTimeCard,
                  index === selectedTimeIndex && styles.selectedTimeCard
                ]}
                onPress={() => slot.available && setSelectedTimeIndex(index)}
                disabled={!slot.available}
              >
                <Text style={[
                  styles.timeText,
                  !slot.available && styles.unavailableTimeText,
                  index === selectedTimeIndex && styles.selectedTimeText
                ]}>{slot.time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Consultation method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultation Method</Text>
          {consultationMethods.map((method, index) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                index === selectedMethodIndex && styles.selectedMethodCard
              ]}
              onPress={() => setSelectedMethodIndex(index)}
            >
              <Text style={styles.methodIcon}>{method.icon}</Text>
              <View style={styles.methodInfo}>
                <Text style={[
                  styles.methodName,
                  index === selectedMethodIndex && styles.selectedMethodText
                ]}>{method.name}</Text>
                <Text style={[
                  styles.methodDescription,
                  index === selectedMethodIndex && styles.selectedMethodDescription
                ]}>{method.description}</Text>
              </View>
              {index === selectedMethodIndex && (
                <Text style={styles.selectedMethodCheck}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Booking summary */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            <View style={styles.summaryContent}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date</Text>
                <Text style={styles.summaryValue}>{dates[selectedDateIndex].full}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Time</Text>
                <Text style={styles.summaryValue}>{timeSlots[selectedTimeIndex].time}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Method</Text>
                <Text style={styles.summaryValue}>{consultationMethods[selectedMethodIndex].name}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Duration</Text>
                <Text style={styles.summaryValue}>30 minutes</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total</Text>
                <Text style={styles.summaryPrice}>{professional.price}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity 
          style={styles.paymentButton}
          onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
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
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  professionalImage: {
    width: 56,
    height: 56,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  professionalEmoji: {
    fontSize: 32,
  },
  professionalDetails: {
    flex: 1,
  },
  nameContainer: {
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
    color: '#4B5563',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingStar: {
    fontSize: 14,
    color: '#F59E0B',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  priceUnit: {
    fontSize: 12,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  datesContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  dateCard: {
    width: 70,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedDateCard: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  dateDay: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginVertical: 4,
  },
  dateMonth: {
    fontSize: 12,
    color: '#6B7280',
  },
  selectedDateText: {
    color: 'white',
  },
  todayText: {
    fontSize: 12,
    color: '#1e3a8a',
    marginTop: 4,
  },
  selectedTodayText: {
    color: '#DBEAFE',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeCard: {
    flex: 1,
    minWidth: '30%',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  unavailableTimeCard: {
    backgroundColor: '#F3F4F6',
    borderColor: '#F3F4F6',
  },
  selectedTimeCard: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  unavailableTimeText: {
    color: '#9CA3AF',
  },
  selectedTimeText: {
    color: 'white',
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  selectedMethodCard: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  methodDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  selectedMethodText: {
    color: 'white',
  },
  selectedMethodDescription: {
    color: '#DBEAFE',
  },
  selectedMethodCheck: {
    fontSize: 20,
    color: 'white',
  },
  summaryCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3a8a',
    marginBottom: 12,
  },
  summaryContent: {
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#4B5563',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#BFDBFE',
    marginVertical: 8,
  },
  summaryTotal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  summaryPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  bottomButton: {
    backgroundColor: 'white',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  paymentButton: {
    backgroundColor: '#1e3a8a',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingScreen;
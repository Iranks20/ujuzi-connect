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
  Chat: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Professional {
  name: string;
  profession: string;
  image: string;
}

interface Booking {
  id: string;
  professional: Professional;
  date: string;
  time: string;
  method: string;
  duration: string;
  price: string;
  paymentMethod: string;
  paymentDate: string;
}

const PaymentConfirmationScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  
  // Sample booking details
  const booking: Booking = {
    id: 'UJZ-2023-07-10-001',
    professional: {
      name: 'Dr. Sarah Mukasa',
      profession: 'Pediatrician',
      image: '👩🏾‍⚕️'
    },
    date: 'Monday, July 10, 2023',
    time: '10:00 AM',
    method: 'Video Call',
    duration: '30 minutes',
    price: 'UGX 50,000',
    paymentMethod: 'MTN Mobile Money',
    paymentDate: 'July 5, 2023 | 11:45 AM'
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payment Successful</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Success animation */}
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successMessage}>
            Your appointment with {booking.professional.name} has been successfully booked and confirmed.
          </Text>
        </View>
        
        {/* Booking details */}
        <View style={styles.section}>
          <View style={styles.bookingCard}>
            <View style={styles.professionalInfo}>
              <View style={styles.professionalImage}>
                <Text style={styles.professionalEmoji}>{booking.professional.image}</Text>
              </View>
              <View>
                <Text style={styles.professionalName}>{booking.professional.name}</Text>
                <Text style={styles.professionalTitle}>{booking.professional.profession}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.bookingGrid}>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingLabel}>Date</Text>
                <Text style={styles.bookingValue}>{booking.date}</Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingLabel}>Time</Text>
                <Text style={styles.bookingValue}>{booking.time}</Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingLabel}>Duration</Text>
                <Text style={styles.bookingValue}>{booking.duration}</Text>
              </View>
              <View style={styles.bookingItem}>
                <Text style={styles.bookingLabel}>Method</Text>
                <Text style={styles.bookingValue}>{booking.method}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.paymentInfo}>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Booking ID</Text>
                <Text style={styles.paymentValue}>{booking.id}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Payment Method</Text>
                <Text style={styles.paymentValue}>{booking.paymentMethod}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Payment Date</Text>
                <Text style={styles.paymentValue}>{booking.paymentDate}</Text>
              </View>
              <View style={[styles.paymentRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Paid</Text>
                <Text style={styles.totalValue}>{booking.price}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Next steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Steps</Text>
          
          <View style={styles.stepsContainer}>
            <View style={styles.stepCard}>
              <View style={styles.stepIcon}>
                <Text style={styles.stepIconText}>📅</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Add to Calendar</Text>
                <Text style={styles.stepDescription}>
                  Don't forget your appointment. Add it to your calendar now.
                </Text>
              </View>
            </View>
            
            <View style={styles.stepCard}>
              <View style={styles.stepIcon}>
                <Text style={styles.stepIconText}>💭</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Prepare for Your Session</Text>
                <Text style={styles.stepDescription}>
                  Write down any questions or concerns you want to discuss during your appointment.
                </Text>
              </View>
            </View>
            
            <View style={styles.stepCard}>
              <View style={styles.stepIcon}>
                <Text style={styles.stepIconText}>🔔</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Reminder Notifications</Text>
                <Text style={styles.stepDescription}>
                  We'll send you a reminder 1 hour before your scheduled appointment.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom buttons */}
      <View style={styles.bottomButton}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.messageButton}
            onPress={() => navigation.navigate('Chat')}
          >
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.doneButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#D1FAE5',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 48,
    color: '#059669',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  successMessage: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  professionalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  professionalTitle: {
    fontSize: 14,
    color: '#4B5563',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  bookingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  bookingItem: {
    flex: 1,
    minWidth: '45%',
  },
  bookingLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  bookingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  paymentInfo: {
    gap: 8,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#4B5563',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  totalRow: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  stepsContainer: {
    gap: 16,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#DBEAFE',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepIconText: {
    fontSize: 20,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#4B5563',
  },
  bottomButton: {
    backgroundColor: 'white',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  messageButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e3a8a',
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentConfirmationScreen;
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
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Booking: undefined;
  PaymentConfirmation: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Professional {
  name: string;
  profession: string;
}

interface Booking {
  professional: Professional;
  date: string;
  time: string;
  method: string;
  duration: string;
  price: string;
}

interface PaymentProvider {
  id: string;
  name: string;
  logo: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  providers: PaymentProvider[];
}

const PaymentScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedProvider, setSelectedProvider] = useState('mtn');
  const [phoneNumber, setPhoneNumber] = useState('077');
  
  // Sample booking details
  const booking: Booking = {
    professional: {
      name: 'Dr. Sarah Mukasa',
      profession: 'Pediatrician'
    },
    date: 'Monday, July 10, 2023',
    time: '10:00 AM',
    method: 'Video Call',
    duration: '30 minutes',
    price: 'UGX 50,000'
  };
  
  // Payment methods
  const paymentMethods: PaymentMethod[] = [
    { 
      id: 'mobile_money', 
      name: 'Mobile Money', 
      icon: '📱',
      providers: [
        { id: 'mtn', name: 'MTN Mobile Money', logo: '🟡' },
        { id: 'airtel', name: 'Airtel Money', logo: '🔴' }
      ]
    },
    { 
      id: 'card', 
      name: 'Credit/Debit Card', 
      icon: '💳',
      providers: []
    },
    { 
      id: 'bank', 
      name: 'Bank Transfer', 
      icon: '🏦',
      providers: []
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Booking')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView style={styles.content}>
        {/* Booking summary */}
        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            <View style={styles.summaryContent}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Professional</Text>
                <View style={styles.summaryValueContainer}>
                  <Text style={styles.summaryValue}>{booking.professional.name}</Text>
                  <Text style={styles.summarySubValue}>{booking.professional.profession}</Text>
                </View>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date</Text>
                <Text style={styles.summaryValue}>{booking.date}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Time</Text>
                <Text style={styles.summaryValue}>{booking.time}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Method</Text>
                <Text style={styles.summaryValue}>{booking.method}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Duration</Text>
                <Text style={styles.summaryValue}>{booking.duration}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotal}>Total</Text>
                <Text style={styles.summaryPrice}>{booking.price}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Payment methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          
          {/* Mobile Money */}
          <View style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodHeader}>
              <Text style={styles.paymentMethodIcon}>{paymentMethods[0].icon}</Text>
              <Text style={styles.paymentMethodName}>{paymentMethods[0].name}</Text>
              <View style={styles.paymentMethodArrow}>
                <Text style={styles.arrowText}>▼</Text>
              </View>
            </View>
            
            <View style={styles.providersContainer}>
              {paymentMethods[0].providers.map((provider, index) => (
                <TouchableOpacity
                  key={provider.id}
                  style={[
                    styles.providerRow,
                    index < paymentMethods[0].providers.length - 1 && styles.providerBorder
                  ]}
                  onPress={() => setSelectedProvider(provider.id)}
                >
                  <View style={styles.providerLogo}>
                    <Text style={styles.providerLogoText}>{provider.logo}</Text>
                  </View>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <View style={styles.radioButton}>
                    {selectedProvider === provider.id && (
                      <View style={styles.radioButtonSelected} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Credit/Debit Card */}
          <TouchableOpacity style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodHeader}>
              <Text style={styles.paymentMethodIcon}>{paymentMethods[1].icon}</Text>
              <Text style={styles.paymentMethodName}>{paymentMethods[1].name}</Text>
              <View style={styles.radioButton}>
                {selectedProvider === 'card' && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
            </View>
          </TouchableOpacity>
          
          {/* Bank Transfer */}
          <TouchableOpacity style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodHeader}>
              <Text style={styles.paymentMethodIcon}>{paymentMethods[2].icon}</Text>
              <Text style={styles.paymentMethodName}>{paymentMethods[2].name}</Text>
              <View style={styles.radioButton}>
                {selectedProvider === 'bank' && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Mobile Money Form */}
        <View style={styles.section}>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>MTN Mobile Money</Text>
            
            <View style={styles.formContent}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your MTN number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
              
              <Text style={styles.formNote}>
                You will receive a prompt on your phone to confirm payment of{' '}
                <Text style={styles.formPrice}>{booking.price}</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={() => navigation.navigate('PaymentConfirmation')}
        >
          <Text style={styles.payButtonText}>Pay {booking.price}</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By proceeding, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Payment Policy</Text>
        </Text>
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
    paddingTop: 48,
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
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
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
  summaryValueContainer: {
    alignItems: 'flex-end',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  summarySubValue: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  paymentMethodCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 12,
    overflow: 'hidden',
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  paymentMethodArrow: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  providersContainer: {
    paddingHorizontal: 16,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  providerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  providerLogo: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  providerLogoText: {
    fontSize: 16,
  },
  providerName: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1e3a8a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1e3a8a',
  },
  formCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e3a8a',
    marginBottom: 12,
  },
  formContent: {
    gap: 16,
  },
  inputContainer: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  formNote: {
    fontSize: 14,
    color: '#4B5563',
  },
  formPrice: {
    fontWeight: '600',
    color: '#1e3a8a',
  },
  bottomButton: {
    backgroundColor: 'white',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  payButton: {
    backgroundColor: '#1e3a8a',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 12,
  },
  termsLink: {
    color: '#1e3a8a',
  },
});

export default PaymentScreen;
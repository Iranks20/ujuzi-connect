import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Booking: { professionalId: string; date: string; time: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
  isBooked?: boolean;
}

interface DayAvailability {
  date: string;
  day: string;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

const { width } = Dimensions.get('window');
const dayWidth = (width - 48) / 7;

const DoctorAvailabilityScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDate, setSelectedDate] = useState('2024-03-20');

  const availability: DayAvailability[] = [
    {
      date: '2024-03-20',
      day: 'Wed',
      isAvailable: true,
      timeSlots: [
        { id: '1', time: '09:00 AM', isAvailable: true },
        { id: '2', time: '10:00 AM', isAvailable: true },
        { id: '3', time: '11:00 AM', isAvailable: false },
        { id: '4', time: '02:00 PM', isAvailable: true },
        { id: '5', time: '03:00 PM', isAvailable: true },
        { id: '6', time: '04:00 PM', isAvailable: false },
      ]
    },
    {
      date: '2024-03-21',
      day: 'Thu',
      isAvailable: true,
      timeSlots: [
        { id: '7', time: '09:00 AM', isAvailable: true },
        { id: '8', time: '10:00 AM', isAvailable: false },
        { id: '9', time: '11:00 AM', isAvailable: true },
        { id: '10', time: '02:00 PM', isAvailable: true },
        { id: '11', time: '03:00 PM', isAvailable: true },
        { id: '12', time: '04:00 PM', isAvailable: true },
      ]
    },
    {
      date: '2024-03-22',
      day: 'Fri',
      isAvailable: true,
      timeSlots: [
        { id: '13', time: '09:00 AM', isAvailable: true },
        { id: '14', time: '10:00 AM', isAvailable: true },
        { id: '15', time: '11:00 AM', isAvailable: true },
        { id: '16', time: '02:00 PM', isAvailable: false },
        { id: '17', time: '03:00 PM', isAvailable: true },
        { id: '18', time: '04:00 PM', isAvailable: true },
      ]
    }
  ];

  const renderDay = ({ item }: { item: DayAvailability }) => (
    <TouchableOpacity
      style={[
        styles.dayContainer,
        selectedDate === item.date && styles.selectedDay
      ]}
      onPress={() => setSelectedDate(item.date)}
      disabled={!item.isAvailable}
    >
      <Text style={[
        styles.dayText,
        !item.isAvailable && styles.unavailableDay
      ]}>
        {item.day}
      </Text>
      <Text style={[
        styles.dateText,
        !item.isAvailable && styles.unavailableDay
      ]}>
        {item.date.split('-')[2]}
      </Text>
    </TouchableOpacity>
  );

  const renderTimeSlot = ({ item }: { item: TimeSlot }) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        !item.isAvailable && styles.unavailableTimeSlot
      ]}
      onPress={() => {
        if (item.isAvailable) {
          navigation.navigate('Booking', {
            professionalId: '1',
            date: selectedDate,
            time: item.time
          });
        }
      }}
      disabled={!item.isAvailable}
    >
      <Text style={[
        styles.timeText,
        !item.isAvailable && styles.unavailableTimeText
      ]}>
        {item.time}
      </Text>
      {item.isBooked && (
        <View style={styles.bookedIndicator}>
          <Text style={styles.bookedText}>Booked</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const selectedDayAvailability = availability.find(day => day.date === selectedDate);

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
        <Text style={styles.headerTitle}>Availability</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <FlatList
          data={availability}
          renderItem={renderDay}
          keyExtractor={item => item.date}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.calendarContent}
        />
      </View>

      {/* Time Slots */}
      <View style={styles.timeSlotsContainer}>
        <Text style={styles.timeSlotsTitle}>Available Time Slots</Text>
        {selectedDayAvailability ? (
          <FlatList
            data={selectedDayAvailability.timeSlots}
            renderItem={renderTimeSlot}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.timeSlotsContent}
          />
        ) : (
          <Text style={styles.noAvailabilityText}>No availability for selected date</Text>
        )}
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
  calendarContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  calendarContent: {
    paddingHorizontal: 16,
  },
  dayContainer: {
    width: dayWidth,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  selectedDay: {
    backgroundColor: '#1e3a8a',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  unavailableDay: {
    color: '#9CA3AF',
  },
  timeSlotsContainer: {
    flex: 1,
    padding: 16,
  },
  timeSlotsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  timeSlotsContent: {
    paddingBottom: 16,
  },
  timeSlot: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unavailableTimeSlot: {
    backgroundColor: '#F3F4F6',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  unavailableTimeText: {
    color: '#9CA3AF',
  },
  bookedIndicator: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bookedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#92400E',
  },
  noAvailabilityText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 32,
  },
});

export default DoctorAvailabilityScreen; 
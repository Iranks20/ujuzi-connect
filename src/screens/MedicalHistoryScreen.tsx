import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Booking: { professionalId: string; medicalHistory: MedicalHistory };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MedicalHistory {
  allergies: string[];
  currentMedications: string[];
  pastSurgeries: string[];
  chronicConditions: string[];
  familyHistory: string;
  lifestyle: {
    smoking: boolean;
    alcohol: boolean;
    exercise: string;
    diet: string;
  };
  additionalNotes: string;
}

const MedicalHistoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>({
    allergies: [],
    currentMedications: [],
    pastSurgeries: [],
    chronicConditions: [],
    familyHistory: '',
    lifestyle: {
      smoking: false,
      alcohol: false,
      exercise: '',
      diet: '',
    },
    additionalNotes: '',
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newSurgery, setNewSurgery] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const addItem = (type: keyof MedicalHistory, value: string) => {
    if (value.trim()) {
      setMedicalHistory(prev => ({
        ...prev,
        [type]: [...(prev[type] as string[]), value.trim()]
      }));
      switch (type) {
        case 'allergies':
          setNewAllergy('');
          break;
        case 'currentMedications':
          setNewMedication('');
          break;
        case 'pastSurgeries':
          setNewSurgery('');
          break;
        case 'chronicConditions':
          setNewCondition('');
          break;
      }
    }
  };

  const removeItem = (type: keyof MedicalHistory, index: number) => {
    setMedicalHistory(prev => ({
      ...prev,
      [type]: (prev[type] as string[]).filter((_, i) => i !== index)
    }));
  };

  const renderItemList = (
    title: string,
    type: keyof MedicalHistory,
    value: string,
    setValue: (value: string) => void,
    placeholder: string
  ) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addItem(type, value)}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemList}>
        {(medicalHistory[type] as string[]).map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity
              onPress={() => removeItem(type, index)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
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
        <Text style={styles.headerTitle}>Medical History</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {renderItemList(
          'Allergies',
          'allergies',
          newAllergy,
          setNewAllergy,
          'Add an allergy'
        )}

        {renderItemList(
          'Current Medications',
          'currentMedications',
          newMedication,
          setNewMedication,
          'Add a medication'
        )}

        {renderItemList(
          'Past Surgeries',
          'pastSurgeries',
          newSurgery,
          setNewSurgery,
          'Add a surgery'
        )}

        {renderItemList(
          'Chronic Conditions',
          'chronicConditions',
          newCondition,
          setNewCondition,
          'Add a condition'
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family History</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={medicalHistory.familyHistory}
            onChangeText={(text) => setMedicalHistory(prev => ({
              ...prev,
              familyHistory: text
            }))}
            placeholder="Enter family medical history"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lifestyle</Text>
          
          <View style={styles.lifestyleItem}>
            <Text style={styles.lifestyleLabel}>Smoking</Text>
            <Switch
              value={medicalHistory.lifestyle.smoking}
              onValueChange={(value) => setMedicalHistory(prev => ({
                ...prev,
                lifestyle: { ...prev.lifestyle, smoking: value }
              }))}
            />
          </View>

          <View style={styles.lifestyleItem}>
            <Text style={styles.lifestyleLabel}>Alcohol Consumption</Text>
            <Switch
              value={medicalHistory.lifestyle.alcohol}
              onValueChange={(value) => setMedicalHistory(prev => ({
                ...prev,
                lifestyle: { ...prev.lifestyle, alcohol: value }
              }))}
            />
          </View>

          <TextInput
            style={styles.input}
            value={medicalHistory.lifestyle.exercise}
            onChangeText={(text) => setMedicalHistory(prev => ({
              ...prev,
              lifestyle: { ...prev.lifestyle, exercise: text }
            }))}
            placeholder="Exercise habits"
            placeholderTextColor="#9CA3AF"
          />

          <TextInput
            style={styles.input}
            value={medicalHistory.lifestyle.diet}
            onChangeText={(text) => setMedicalHistory(prev => ({
              ...prev,
              lifestyle: { ...prev.lifestyle, diet: text }
            }))}
            placeholder="Dietary habits"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={medicalHistory.additionalNotes}
            onChangeText={(text) => setMedicalHistory(prev => ({
              ...prev,
              additionalNotes: text
            }))}
            placeholder="Any additional information"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate('Booking', {
            professionalId: '1',
            medicalHistory
          })}
        >
          <Text style={styles.submitButtonText}>Continue to Booking</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginLeft: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  itemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: '#E0E7FF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: '#1e3a8a',
    fontSize: 14,
    marginRight: 4,
  },
  removeButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1e3a8a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
  },
  lifestyleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  lifestyleLabel: {
    fontSize: 16,
    color: '#374151',
  },
  submitButton: {
    backgroundColor: '#1e3a8a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MedicalHistoryScreen; 
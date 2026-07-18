import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { BookingContext } from '../context/BookingContext';

const symptomsList = ['Nausea', 'Fever', 'Weight loss', 'Cough', 'Headache', 'Chest pain', 'Rashes', 'Others'];

const BookAppointmentStep1 = ({ navigation }) => {
  const { bookingData, updateBooking } = useContext(BookingContext);
  const [selectedSymptoms, setSelectedSymptoms] = useState(bookingData.symptoms || []);
  const [details, setDetails] = useState(bookingData.details || '');

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleContinue = () => {
    updateBooking({ symptoms: selectedSymptoms, details });
    navigation.navigate('BookAppointmentStep2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <View style={styles.stepIndicator}>
              <Text style={styles.stepText}>1/4</Text>
            </View>
          </View>

          <Text style={styles.title}>Tell the doctor what's going on</Text>

          <View style={styles.testSummaryCard}>
            <View>
              <Text style={styles.testName}>{bookingData.testName}</Text>
              <Text style={styles.labName}>{bookingData.labName}</Text>
            </View>
            <Text style={styles.price}>{bookingData.price}</Text>
          </View>

          <Text style={styles.sectionTitle}>Select your symptoms</Text>
          <View style={styles.symptomsContainer}>
            {symptomsList.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom);
              return (
                <TouchableOpacity 
                  key={symptom} 
                  style={[styles.symptomChip, isSelected && styles.symptomChipActive]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[styles.symptomText, isSelected && styles.symptomTextActive]}>{symptom}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>Additional details <Text style={styles.optional}>(optional)</Text></Text>
          <TextInput
            style={styles.textArea}
            placeholder="e.g. constant dizziness at night"
            multiline
            numberOfLines={4}
            value={details}
            onChangeText={setDetails}
          />

          <Text style={styles.sectionTitle}>Attach any document <Text style={styles.optional}>(optional)</Text></Text>
          <Text style={styles.attachSubtext}>Upload supporting pictures, previous result or referral letter</Text>
          
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachButtonText}>⊕ Add file</Text>
          </TouchableOpacity>

        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleContinue}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  stepIndicator: {
    backgroundColor: '#EEF3FF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A85FE',
    borderLeftColor: '#E0E0E0', // Faking a progress ring
    borderBottomColor: '#E0E0E0',
  },
  stepText: {
    color: '#4A85FE',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  testSummaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  testName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  labName: {
    fontSize: 12,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  optional: {
    fontWeight: 'normal',
    color: '#888',
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  symptomChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginRight: 10,
    marginBottom: 10,
  },
  symptomChipActive: {
    borderColor: '#4A85FE',
    backgroundColor: '#EEF3FF',
  },
  symptomText: {
    fontSize: 14,
    color: '#555',
  },
  symptomTextActive: {
    color: '#4A85FE',
    fontWeight: '500',
  },
  textArea: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  attachSubtext: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  attachButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    marginBottom: 24,
  },
  attachButtonText: {
    color: '#4A85FE',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
  },
  skipButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    marginRight: 12,
  },
  skipButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  continueButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#4A85FE',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default BookAppointmentStep1;

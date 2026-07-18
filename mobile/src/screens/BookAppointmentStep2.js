import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { BookingContext } from '../context/BookingContext';
import { Calendar } from 'react-native-calendars';

const availableTimes = ['08:00', '09:00', '10:00', '11:00', '12:00'];

const BookAppointmentStep2 = ({ navigation }) => {
  const { bookingData, updateBooking } = useContext(BookingContext);
  const [appointmentType, setAppointmentType] = useState(bookingData.appointmentType || 'Walk-in');
  const [selectedTime, setSelectedTime] = useState(bookingData.time || '08:00');
  const [selectedDate, setSelectedDate] = useState(bookingData.date || new Date().toISOString().split('T')[0]);
  
  const handleContinue = () => {
    updateBooking({ appointmentType, time: selectedTime, date: selectedDate });
    navigation.navigate('BookAppointmentStep3');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>2/4</Text>
          </View>
        </View>

        <Text style={styles.title}>Choose how you'd like your test</Text>

        <View style={styles.testSummaryCard}>
          <View>
            <Text style={styles.testName}>{bookingData.testName}</Text>
            <Text style={styles.labName}>{bookingData.labName}</Text>
          </View>
          <Text style={styles.price}>{bookingData.price}</Text>
        </View>

        <Text style={styles.sectionTitle}>Appointment type</Text>
        
        <TouchableOpacity 
          style={[styles.typeCard, appointmentType === 'Walk-in' && styles.typeCardActive]}
          onPress={() => setAppointmentType('Walk-in')}
        >
          <View>
            <Text style={styles.typeName}>Walk-in</Text>
            <Text style={styles.typeSubtext}>Visit our laboratory</Text>
          </View>
          <View style={[styles.radio, appointmentType === 'Walk-in' && styles.radioActive]} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.typeCard, appointmentType === 'Home service' && styles.typeCardActive]}
          onPress={() => setAppointmentType('Home service')}
        >
          <View>
            <Text style={styles.typeName}>Home service</Text>
            <Text style={styles.typeSubtext}>A specialist comes to you</Text>
          </View>
          <View style={[styles.radio, appointmentType === 'Home service' && styles.radioActive]} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Pick a date</Text>
        <Calendar
          style={styles.calendarContainer}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#4A85FE' }
          }}
          theme={{
            selectedDayBackgroundColor: '#4A85FE',
            todayTextColor: '#4A85FE',
            arrowColor: '#4A85FE',
          }}
        />

        <Text style={styles.sectionTitle}>Available time slots</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
          {availableTimes.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <TouchableOpacity 
                key={time} 
                style={[styles.timeChip, isSelected && styles.timeChipActive]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeText, isSelected && styles.timeTextActive]}>{time}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backFooterButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backFooterText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 40,
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
    borderRightColor: '#E0E0E0',
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
    marginTop: 8,
  },
  typeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginBottom: 12,
  },
  typeCardActive: {
    borderColor: '#4A85FE',
    backgroundColor: '#F4F8FF',
  },
  typeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  typeSubtext: {
    fontSize: 12,
    color: '#888',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
  },
  radioActive: {
    borderColor: '#4A85FE',
    backgroundColor: '#4A85FE',
  },
  calendarContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    marginBottom: 24,
  },
  timeScroll: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    marginRight: 12,
  },
  timeChipActive: {
    borderColor: '#4A85FE',
    backgroundColor: '#EEF3FF',
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
  timeTextActive: {
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
  backFooterButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    marginRight: 12,
  },
  backFooterText: {
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

export default BookAppointmentStep2;

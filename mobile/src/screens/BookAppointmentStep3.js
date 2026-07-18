import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { BookingContext } from '../context/BookingContext';

const BookAppointmentStep3 = ({ navigation }) => {
  const { bookingData } = useContext(BookingContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>3/4</Text>
          </View>
        </View>

        <Text style={styles.title}>Confirm details</Text>

        <View style={styles.testSummaryCard}>
          <View>
            <Text style={styles.testName}>{bookingData.testName}</Text>
            <Text style={styles.labName}>{bookingData.labName}</Text>
          </View>
          <Text style={styles.price}>{bookingData.price}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}><Text>🏢</Text></View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailValue}>{bookingData.labName}</Text>
              <Text style={styles.detailLabel}>Laboratory</Text>
            </View>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}><Text>🧪</Text></View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailValue}>{bookingData.testName}</Text>
              <Text style={styles.detailLabel}>Test category</Text>
            </View>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}><Text>📅</Text></View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailValue}>Fri, 16 July, 2026 • {bookingData.time || '4:00 PM'}</Text>
              <Text style={styles.detailLabel}>Date & time</Text>
            </View>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}><Text>📍</Text></View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailValue}>{bookingData.appointmentType}</Text>
              <Text style={styles.detailLabel}>Appointment type</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backFooterButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backFooterText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('BookAppointmentStep4')}>
          <Text style={styles.continueButtonText}>Proceed to pay</Text>
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
    borderLeftColor: '#E0E0E0', 
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
  detailsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 56, // Align with text
  },
  footer: {
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
    marginTop: 'auto',
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

export default BookAppointmentStep3;

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { BookingContext } from '../context/BookingContext';

const BookAppointmentSuccess = ({ navigation }) => {
  const { bookingData } = useContext(BookingContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.iconContainer}>
          <View style={styles.checkIconWrapper}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
        </View>

        <Text style={styles.title}>Payment Successful! 🎉</Text>
        <Text style={styles.subtitle}>Your payment has been successfully completed.</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.testSummaryCard}>
            <View>
              <Text style={styles.testName}>{bookingData.testName}</Text>
              <Text style={styles.labName}>{bookingData.labName}</Text>
            </View>
            <Text style={styles.price}>{bookingData.price}</Text>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.detailItem}>
            <View style={styles.detailIcon}><Text>🏢</Text></View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailValue}>{bookingData.labName}</Text>
              <Text style={styles.detailLabel}>Laboratory</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}><Text>🧪</Text></View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailValue}>{bookingData.testName}</Text>
              <Text style={styles.detailLabel}>Test category</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <View style={styles.detailIcon}><Text>📅</Text></View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailValue}>Fri, 16 July, 2026 • {bookingData.time || '4:00 PM'}</Text>
              <Text style={styles.detailLabel}>Date & time</Text>
            </View>
          </View>
          
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
        <TouchableOpacity style={styles.backFooterButton} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.backFooterText}>Back home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.continueButtonText}>View booking</Text>
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
    alignItems: 'center',
    paddingTop: 60,
  },
  iconContainer: {
    marginBottom: 24,
  },
  checkIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A85FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#FFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 40,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  testSummaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
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
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  detailLabel: {
    fontSize: 11,
    color: '#888',
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

export default BookAppointmentSuccess;

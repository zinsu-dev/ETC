import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import CancelBookingModal from '../components/CancelBookingModal';

const AppointmentDetailsScreen = ({ navigation, route }) => {
  const { appointment } = route.params || {};
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  // If no params, provide fallback data for preview
  const appData = appointment || {
    name: 'Ante-natal test',
    lab: 'Peak Diagnostic Laboratory',
    distance: '2.4 km',
    price: '₦2,400',
    status: 'Confirmed'
  };

  const handleCancelConfirm = (reason) => {
    console.log("Cancelled reason:", reason);
    setCancelModalVisible(false);
    navigation.goBack(); // Return to bookings after cancel
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{appData.name}</Text>
          <Text style={styles.headerSubtitle}>{appData.lab} • {appData.distance}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.testName}>{appData.name}</Text>
            <Text style={styles.labName}>📍 {appData.lab} • {appData.distance}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{appData.price}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{appData.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsList}>
          <View style={styles.detailRow}>
            <View style={styles.iconWrapper}><Text>🕒</Text></View>
            <View>
              <Text style={styles.detailValue}>Mon-Sat • 7:00am - 7:00pm</Text>
              <Text style={styles.detailLabel}>Date & time</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconWrapper}><Text>📞</Text></View>
            <View>
              <Text style={styles.detailValue}>+234 801 234 5678</Text>
              <Text style={styles.detailLabel}>Phone</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconWrapper}><Text>✉️</Text></View>
            <View>
              <Text style={styles.detailValue}>hello@clina-lancet.ng</Text>
              <Text style={styles.detailLabel}>Email</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.iconWrapper}><Text>📍</Text></View>
            <View>
              <Text style={styles.detailValue}>Walk-in</Text>
              <Text style={styles.detailLabel}>Type</Text>
            </View>
          </View>
        </View>

        <View style={styles.warningBox}>
          <Text style={styles.warningIcon}>!</Text>
          <Text style={styles.warningText}>
            Results normally arrive within few days after appointment. We will notify you when they are ready.
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => setCancelModalVisible(true)}
          >
            <Text style={styles.cancelButtonText}>Cancel booking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rescheduleButton}>
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <CancelBookingModal 
        visible={cancelModalVisible}
        onClose={() => setCancelModalVisible(false)}
        onConfirm={handleCancelConfirm}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80, // Increased top padding
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    marginLeft: -8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Added bottom padding for navigation bar
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  testName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  labName: {
    fontSize: 11,
    color: '#888',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#2E7D32',
    fontSize: 10,
    fontWeight: 'bold',
  },
  detailsList: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  detailLabel: {
    fontSize: 12,
    color: '#888',
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE082',
    borderStyle: 'dashed',
    marginBottom: 30,
    alignItems: 'center',
  },
  warningIcon: {
    color: '#FFA000',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },
  warningText: {
    flex: 1,
    color: '#D84315',
    fontSize: 12,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#FF4D4D',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  cancelButtonText: {
    color: '#FF4D4D',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rescheduleButton: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AppointmentDetailsScreen;

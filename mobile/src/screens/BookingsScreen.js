import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import RateAppointmentModal from '../components/RateAppointmentModal';

const mockAppointments = [
  { id: 1, type: 'Upcoming', name: 'Ante-natal test', lab: 'Peak Diagnostic Laboratory', distance: '2.4 km', price: '₦2,400', date: '16 May, 2026', time: '3:00 PM', serviceType: 'Walk-in', status: 'Confirmed' },
  { id: 2, type: 'Upcoming', name: 'Ante-natal test', lab: 'Peak Diagnostic Laboratory', distance: '2.4 km', price: '₦2,400', date: '16 May, 2026', time: '3:00 PM', serviceType: 'Walk-in', status: 'Confirmed' },
  { id: 3, type: 'Past', name: 'Ante-natal test', lab: 'Peak Diagnostic Laboratory', distance: '2.4 km', price: '₦2,400', date: '16 May, 2026', time: '3:00 PM', serviceType: 'Walk-in', status: 'Result ready' },
  { id: 4, type: 'Cancelled', name: 'Ante-natal test', lab: 'Peak Diagnostic Laboratory', distance: '2.4 km', price: '₦2,400', date: '16 May, 2026', time: '3:00 PM', serviceType: 'Walk-in', status: 'Cancelled' },
];

const BookingsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [rateModalVisible, setRateModalVisible] = useState(false);

  const filteredAppointments = mockAppointments.filter(app => app.type === activeTab);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Confirmed': return styles.statusConfirmed;
      case 'Result ready': return styles.statusReady;
      case 'Cancelled': return styles.statusCancelled;
      default: return {};
    }
  };

  const getStatusTextStyle = (status) => {
    switch(status) {
      case 'Confirmed': return styles.statusTextConfirmed;
      case 'Result ready': return styles.statusTextReady;
      case 'Cancelled': return styles.statusTextCancelled;
      default: return {};
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#A0A0A0"
        />
      </View>

      <View style={styles.tabsContainer}>
        {['Upcoming', 'Past', 'Cancelled'].map(tab => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredAppointments.map(app => (
          <View key={app.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.testName}>{app.name}</Text>
                <Text style={styles.labName}>📍 {app.lab} • {app.distance}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{app.price}</Text>
                <View style={[styles.statusBadge, getStatusStyle(app.status)]}>
                  <Text style={[styles.statusText, getStatusTextStyle(app.status)]}>{app.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardDetails}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{app.date}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>{app.time}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{app.serviceType}</Text>
              </View>
            </View>

            {activeTab === 'Upcoming' && (
              <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AppointmentDetails', { appointment: app })}>
                <Text style={styles.actionButtonText}>View details &gt;</Text>
              </TouchableOpacity>
            )}

            {activeTab === 'Past' && (
              <View style={styles.pastActions}>
                <TouchableOpacity style={[styles.actionButton, {flex: 1, marginRight: 8}]} onPress={() => navigation.navigate('AppointmentDetails', { appointment: app })}>
                  <Text style={styles.actionButtonText}>View details &gt;</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rateButton} onPress={() => setRateModalVisible(true)}>
                  <Text style={styles.rateButtonText}>Rate</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeTab === 'Cancelled' && (
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Book again &gt;</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      <RateAppointmentModal 
        visible={rateModalVisible} 
        onClose={() => setRateModalVisible(false)} 
        onSubmit={(data) => {
          console.log('Rated:', data);
          setRateModalVisible(false);
        }}
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
    paddingHorizontal: 20,
    paddingTop: 50,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusConfirmed: { backgroundColor: '#E8F5E9' },
  statusTextConfirmed: { color: '#2E7D32' },
  statusReady: { backgroundColor: '#E3F2FD' },
  statusTextReady: { color: '#1565C0' },
  statusCancelled: { backgroundColor: '#FFEBEE' },
  statusTextCancelled: { color: '#C62828' },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    color: '#888',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#4A85FE',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#4A85FE',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pastActions: {
    flexDirection: 'row',
  },
  rateButton: {
    backgroundColor: '#FFF5E5',
    borderWidth: 1,
    borderColor: '#FFA000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  rateButtonText: {
    color: '#F57C00',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BookingsScreen;

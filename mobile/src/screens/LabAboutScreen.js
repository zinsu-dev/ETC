import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const LabAboutScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('About lab'); // 'About lab' or 'Popular tests'

  const popularTests = [
    { id: 1, name: 'Heart beat test', hospital: 'Evercare Hospital', price: '₦2,400' },
    { id: 2, name: 'Heart beat test', hospital: 'Evercare Hospital', price: '₦2,400' },
    { id: 3, name: 'Heart beat test', hospital: 'Evercare Hospital', price: '₦2,400' },
    { id: 4, name: 'Heart beat test', hospital: 'Evercare Hospital', price: '₦2,400' },
  ];

  return (
    <View style={styles.container}>
      {/* Hero Image / Map background */}
      <ImageBackground 
        source={{ uri: 'https://via.placeholder.com/400x300.png?text=Map+or+Hero+Image' }} 
        style={styles.heroBackground}
      >
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>
          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>↗</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { marginLeft: 12 }]}>
              <Text style={styles.iconText}>⋮</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Main Content Card (overlaps hero) */}
      <View style={styles.contentContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.labName}>Peak Diagnostic Laboratory</Text>
          <Text style={styles.labLocation}>Lekki toll gate</Text>
          
          <View style={styles.tagsContainer}>
            <Text style={styles.tag}>🏡 Home service</Text>
            <Text style={styles.tag}>⏱ ~34mins wait</Text>
            <Text style={styles.tag}>📍 24km away</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.5</Text>
              <Text style={styles.statLabel}>Ratings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Completed test</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Upcoming bookings</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'About lab' && styles.activeTab]}
              onPress={() => setActiveTab('About lab')}
            >
              <Text style={[styles.tabText, activeTab === 'About lab' && styles.activeTabText]}>About lab</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'Popular tests' && styles.activeTab]}
              onPress={() => setActiveTab('Popular tests')}
            >
              <Text style={[styles.tabText, activeTab === 'Popular tests' && styles.activeTabText]}>Popular tests</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Content */}
        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          {activeTab === 'About lab' ? (
            <View style={styles.aboutContent}>
              <Text style={styles.sectionTitle}>About lab</Text>
              <Text style={styles.description}>
                Full-service diagnostic laboratory offering routine blood work, infection screening and hormone panels. Trained phlebotomists, same-day results on most rapid tests.
              </Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactItem}>⏱ Mon-Sat • 7:00am - 7:00pm</Text>
                <Text style={styles.contactItem}>📞 +234 801 234 5678</Text>
                <Text style={styles.contactItem}>✉️ hello@clina-lancet.ng</Text>
                <Text style={styles.contactItem}>🛡️ NHREC accredited</Text>
              </View>
            </View>
          ) : (
            <View style={styles.testsContent}>
              {popularTests.map((test, index) => (
                <View key={index} style={styles.testCard}>
                  <View style={styles.testDetails}>
                    <Text style={styles.testName}>{test.name}</Text>
                    <Text style={styles.testMeta}>{test.hospital} • {test.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.bookBtn} onPress={() => navigation.navigate('BookAppointmentStep1')}>
                    <Text style={styles.bookBtnText}>Book</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookAppointmentButton} onPress={() => navigation.navigate('BookAppointmentStep1')}>
          <Text style={styles.bookAppointmentText}>Book appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  heroBackground: {
    height: 250,
    backgroundColor: '#A3B1C6', // Fallback color
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 80, // Increased top padding
  },
  rightActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconText: {
    fontSize: 20,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    marginTop: -40, // Overlap the hero image
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  infoCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: -20, // Float slightly above the rounded background
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  labName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  labLocation: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: 11,
    color: '#666',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EEE',
    height: '100%',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 4,
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
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  aboutContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 20,
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 16,
  },
  contactItem: {
    fontSize: 13,
    color: '#555',
    marginBottom: 12,
  },
  testsContent: {
    paddingBottom: 20,
  },
  testCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  testDetails: {
    flex: 1,
  },
  testName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  testMeta: {
    fontSize: 12,
    color: '#888',
  },
  bookBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  bookBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  saveButton: {
    flex: 0.3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bookAppointmentButton: {
    flex: 0.7,
    backgroundColor: '#4A85FE',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookAppointmentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default LabAboutScreen;

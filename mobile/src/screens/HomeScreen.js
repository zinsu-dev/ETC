import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const categories = [
    { id: 1, name: 'General health', icon: '❤️' },
    { id: 2, name: 'Ante-natal', icon: '🤰' },
    { id: 3, name: 'Heart & blood', icon: '🩸' },
    { id: 4, name: 'Hormones', icon: '🧪' },
    { id: 5, name: 'Infections', icon: '🦠' },
  ];

  const labs = [
    { id: 1, name: 'Peak Diagnostic Laboratory', location: 'Lekki toll gate', distance: '2.4 km', rating: '4.7', image: '🟠' },
    { id: 2, name: 'Aves Specialty', location: 'Banana Island', distance: '2.4 km', rating: '4.7', image: '🌇' },
    { id: 3, name: 'Lagoon hospital', location: 'Ikoyi', distance: '2.4 km', rating: '4.7', image: '🏥' },
  ];

  const previousTests = [
    { id: 1, name: 'Heart beat test', hospital: 'Evercare Hospital', price: '₦2,400' },
    { id: 2, name: 'Heart beat test', hospital: 'Evercare Hospital', price: '₦2,400' },
    { id: 3, name: 'Heart beat test', hospital: 'Evercare Hospital', price: '₦2,400' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi, john 👋</Text>
          <TouchableOpacity style={styles.notificationBtn}>
            <Text>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CategoryLabs')}><Text style={styles.seeAll}>See all ➔</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryCard} onPress={() => navigation.navigate('CategoryLabs')}>
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Upcoming Appointment */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming appointment</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Appointments')}><Text style={styles.seeAll}>See all ➔</Text></TouchableOpacity>
        </View>
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentHeader}>
            <View style={styles.appointmentImagePlaceholder} />
            <View>
              <Text style={styles.appointmentTitle}>Malaria Test</Text>
              <Text style={styles.appointmentSubtitle}>Intercontinental Specialist Laboratory</Text>
            </View>
          </View>
          <View style={styles.appointmentTimeContainer}>
            <Text style={styles.appointmentTime}>📅 4, July, 2026 • 4:00 PM</Text>
            <Text style={styles.appointmentChevron}>»</Text>
          </View>
        </View>

        {/* Labs near you */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Labs near you</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LabsNearYou')}><Text style={styles.seeAll}>See all ➔</Text></TouchableOpacity>
        </View>
        {labs.map((lab) => (
          <TouchableOpacity key={lab.id} style={styles.labCard} onPress={() => navigation.navigate('LabAbout')}>
            <View style={styles.labImagePlaceholder}>
              <Text>{lab.image}</Text>
            </View>
            <View style={styles.labDetails}>
              <Text style={styles.labName}>{lab.name}</Text>
              <Text style={styles.labMeta}>📍 {lab.location} • {lab.distance}   ⭐ {lab.rating}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Hear what your body is telling you */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hear what your body is telling you</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all ➔</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.videoCard}>
              <View style={styles.videoPlaceholder} />
              <Text style={styles.videoTitle}>Heart health and heart attack</Text>
            </View>
          ))}
        </ScrollView>

        {/* Book again */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Book again</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all ➔</Text></TouchableOpacity>
        </View>
        {previousTests.map((test) => (
          <View key={test.id} style={styles.historyCard}>
            <View style={styles.historyDetails}>
              <Text style={styles.historyName}>{test.name}</Text>
              <Text style={styles.historyMeta}>{test.hospital} • {test.price}</Text>
            </View>
            <TouchableOpacity style={styles.bookAgainBtn} onPress={() => navigation.navigate('BookAppointmentStep1')}>
              <Text style={styles.bookAgainText}>Book again</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for bottom tab nav overlay
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationBtn: {
    padding: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    color: '#4A85FE',
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    width: 90,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
  },
  appointmentCard: {
    backgroundColor: '#4A85FE',
    borderRadius: 16,
    padding: 16,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  appointmentImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8AB4F8',
    marginRight: 12,
  },
  appointmentTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentSubtitle: {
    color: '#E8F0FE',
    fontSize: 12,
  },
  appointmentTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 8,
  },
  appointmentTime: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  appointmentChevron: {
    color: '#FFF',
    fontSize: 16,
  },
  labCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  labImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  labDetails: {
    flex: 1,
  },
  labName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  labMeta: {
    fontSize: 12,
    color: '#888',
  },
  chevron: {
    fontSize: 20,
    color: '#CCC',
  },
  videoCard: {
    width: 140,
    marginRight: 12,
  },
  videoPlaceholder: {
    height: 140,
    backgroundColor: '#D9E2EC',
    borderRadius: 12,
    marginBottom: 8,
  },
  videoTitle: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  historyDetails: {
    flex: 1,
  },
  historyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  historyMeta: {
    fontSize: 12,
    color: '#888',
  },
  bookAgainBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
  },
  bookAgainText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});

export default HomeScreen;

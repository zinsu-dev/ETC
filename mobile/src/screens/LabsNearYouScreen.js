import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Image } from 'react-native';

const LabsNearYouScreen = ({ navigation }) => {
  // Mock data based on design
  const labs = [
    { id: 1, name: 'Peak Diagnostic Laboratory', location: 'Ikeja', distance: '2.4 km', image: 'https://via.placeholder.com/60' },
    { id: 2, name: 'Peak Diagnostic Laboratory', location: 'Ikeja', distance: '2.4 km', image: 'https://via.placeholder.com/60' },
    { id: 3, name: 'Peak Diagnostic Laboratory', location: 'Ikeja', distance: '2.4 km', image: 'https://via.placeholder.com/60' },
    { id: 4, name: 'Peak Diagnostic Laboratory', location: 'Ikeja', distance: '2.4 km', image: 'https://via.placeholder.com/60' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Labs Near You</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search labs"
          placeholderTextColor="#A0A0A0"
        />
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {labs.map((lab) => (
          <TouchableOpacity key={lab.id} style={styles.labCard} onPress={() => navigation.navigate('LabAbout')}>
            <Image source={{ uri: lab.image }} style={styles.labImage} />
            <View style={styles.labInfo}>
              <Text style={styles.labName}>{lab.name}</Text>
              <Text style={styles.labLocation}>{lab.location} • {lab.distance}</Text>
            </View>
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: 20,
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
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Added padding for navigation
  },
  labCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  labImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#EAEAEA',
    marginRight: 16,
  },
  labInfo: {
    flex: 1,
  },
  labName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  labLocation: {
    fontSize: 12,
    color: '#888',
  },
});

export default LabsNearYouScreen;

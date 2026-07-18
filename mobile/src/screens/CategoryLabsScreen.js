import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';

const CategoryLabsScreen = ({ navigation, route }) => {
  // Mock data based on design
  const labs = [
    { id: 1, name: 'Lagoon laboratory', location: 'Iyana Oworo', distance: '2.4 km', rating: '4.7', price: '₦2,400', image: '🏥' },
    { id: 2, name: 'Evercare Hospital', location: 'Lekki toll gate', distance: '2.4 km', rating: '4.7', price: '₦2,400', image: '🏨' },
    { id: 3, name: 'Peak Diagnostic Laboratory', location: 'Oba-ile, Akure', distance: '2.4 km', rating: '4.7', price: '₦2,400', image: '🟠' },
    { id: 4, name: 'Picco labs', location: 'Ajah', distance: '2.4 km', rating: '4.7', price: '₦2,400', image: '🏢' },
    { id: 5, name: 'BMO hospital', location: 'Ikeja', distance: '2.4 km', rating: '4.7', price: '₦2,400', image: '🏥' },
    { id: 6, name: 'Evercare Hospital', location: 'Obalende', distance: '2.4 km', rating: '4.7', price: '₦2,400', image: '🏨' },
  ];

  const filters = ['Nearest', 'Cheapest', 'Highest rating', 'Home service'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prenatal</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#A0A0A0"
        />
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter, index) => (
            <TouchableOpacity key={index} style={styles.filterChip}>
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {labs.map((lab) => (
          <TouchableOpacity key={lab.id} style={styles.labCard} onPress={() => navigation.navigate('LabAbout')}>
            <View style={styles.labImagePlaceholder}>
              <Text>{lab.image}</Text>
            </View>
            <View style={styles.labDetails}>
              <Text style={styles.labName}>{lab.name}</Text>
              <Text style={styles.labMeta}>📍 {lab.location} • {lab.distance}  ⭐ {lab.rating}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.fromText}>From</Text>
              <Text style={styles.priceText}>{lab.price}</Text>
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
    marginLeft: -8,
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  filtersContainer: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
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
    fontSize: 11,
    color: '#888',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  fromText: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryLabsScreen;

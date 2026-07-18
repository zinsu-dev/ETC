import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';

const BookAppointmentStep4 = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Bank transfer');

  const renderBankTransfer = () => (
    <View style={styles.tabContent}>
      <Text style={styles.transferTitle}>Make a transfer to the account below</Text>
      
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Bank name:</Text>
        <Text style={styles.detailValue}>Sterling Bank</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Account name:</Text>
        <Text style={styles.detailValue}>Xyz dls</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Amount:</Text>
        <Text style={styles.detailValue}>$45678.90 📋</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Account no:</Text>
        <Text style={styles.detailValue}>56789034555555 📋</Text>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningText}>⚠️ Use this account for this transaction only. It will expire in 45:09</Text>
      </View>
    </View>
  );

  const renderCardPayment = () => (
    <View style={styles.tabContent}>
      <Text style={styles.inputLabel}>First name</Text>
      <TextInput style={styles.inputField} placeholder="Enter your first name" />

      <Text style={styles.inputLabel}>Last name</Text>
      <TextInput style={styles.inputField} placeholder="Enter your last name" />

      <Text style={styles.inputLabel}>Contact number</Text>
      <View style={styles.phoneInputContainer}>
        <Text style={styles.countryCode}>🇳🇬 ⌄</Text>
        <TextInput style={styles.phoneInputField} placeholder="+234 0000000000" keyboardType="phone-pad" />
      </View>

      <View style={styles.cardDetailsBox}>
        <Text style={styles.cardDetailsLabel}>CARD DETAILS</Text>
        
        <Text style={styles.inputLabel}>CVV (Card number)</Text>
        <View style={styles.cardNumberContainer}>
          <TextInput style={styles.cardNumberField} placeholder="0000 0000 0000 0000" keyboardType="number-pad" />
          <Text style={styles.visaText}>VISA</Text>
        </View>

        <View style={styles.cardRow}>
          <View style={styles.cardHalf}>
            <Text style={styles.inputLabel}>Exp. date</Text>
            <TextInput style={styles.inputField} placeholder="00/00" />
          </View>
          <View style={styles.cardHalf}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput style={styles.inputField} placeholder="***" secureTextEntry />
          </View>
        </View>
      </View>
    </View>
  );

  const renderPayAtLab = () => (
    <View style={styles.tabContent}>
      <View style={styles.payAtLabBox}>
        <Text style={styles.payAtLabTitle}>Pay on arrival</Text>
        <Text style={styles.payAtLabText}>You can pay with cash, card, or transfer when you arrive at the laboratory.</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>4/4</Text>
          </View>
        </View>

        <Text style={styles.title}>Payment details</Text>

        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Bank transfer' && styles.activeTab]}
            onPress={() => setActiveTab('Bank transfer')}
          >
            <Text style={[styles.tabText, activeTab === 'Bank transfer' && styles.activeTabText]}>Bank transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Card' && styles.activeTab]}
            onPress={() => setActiveTab('Card')}
          >
            <Text style={[styles.tabText, activeTab === 'Card' && styles.activeTabText]}>Card</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Pay at lab' && styles.activeTab]}
            onPress={() => setActiveTab('Pay at lab')}
          >
            <Text style={[styles.tabText, activeTab === 'Pay at lab' && styles.activeTabText]}>Pay at lab</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Bank transfer' && renderBankTransfer()}
        {activeTab === 'Card' && renderCardPayment()}
        {activeTab === 'Pay at lab' && renderPayAtLab()}

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backFooterButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backFooterText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('BookAppointmentSuccess')}>
          <Text style={styles.continueButtonText}>I have paid</Text>
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
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
    fontSize: 12,
    fontWeight: '500',
    color: '#888',
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
  },
  transferTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  warningBox: {
    backgroundColor: '#FFF5E5',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA000',
    marginTop: 16,
  },
  warningText: {
    color: '#D84315',
    fontSize: 12,
    lineHeight: 18,
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
  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 24,
  },
  countryCode: {
    padding: 14,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    fontSize: 14,
  },
  phoneInputField: {
    flex: 1,
    padding: 14,
    fontSize: 14,
    color: '#333',
  },
  cardDetailsBox: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  cardDetailsLabel: {
    fontSize: 10,
    color: '#888',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
    paddingRight: 12,
  },
  cardNumberField: {
    flex: 1,
    padding: 14,
    fontSize: 14,
    color: '#333',
  },
  visaText: {
    color: '#1A1F71',
    fontWeight: 'bold',
    fontSize: 16,
    fontStyle: 'italic',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHalf: {
    flex: 0.48,
  },
  payAtLabBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 20,
  },
  payAtLabTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  payAtLabText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default BookAppointmentStep4;

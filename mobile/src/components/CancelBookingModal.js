import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

const CancelBookingModal = ({ visible, onClose, onConfirm }) => {
  const [step, setStep] = useState(1); // 1 = Confirm, 2 = Reason
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const reasons = [
    "I'm no longer interested",
    "I just don't like them",
    "Scam or illegal activities",
    "I got busy",
    "Others"
  ];

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onConfirm(selectedReason === 'Others' ? otherReason : selectedReason);
      setStep(1);
      setSelectedReason('');
      setOtherReason('');
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedReason('');
    setOtherReason('');
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={handleClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={handleClose}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            
            <View style={styles.dragIndicator} />

            {step === 1 ? (
              // Step 1: Confirmation
              <View style={styles.stepContainer}>
                <View style={styles.iconContainer}>
                  <Text style={styles.cancelIcon}>❌</Text>
                </View>
                <Text style={styles.title}>Cancel booking?</Text>
                <Text style={styles.subtitle}>
                  Are you sure you want to cancel this appointment? Your payment will not be refunded and this action cannot be undone.
                </Text>
                
                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleNext}>
                    <Text style={styles.cancelButtonText}>Cancel booking</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rescheduleButton} onPress={handleClose}>
                    <Text style={styles.rescheduleButtonText}>Reschedule</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // Step 2: Reason
              <View style={styles.stepContainer}>
                <View style={styles.headerRow}>
                  <Text style={styles.titleReason}>Why are you cancelling?</Text>
                  <TouchableOpacity onPress={handleClose}><Text style={styles.closeBtn}>✕</Text></TouchableOpacity>
                </View>

                {reasons.map((reason) => (
                  <TouchableOpacity 
                    key={reason} 
                    style={styles.reasonRow}
                    onPress={() => setSelectedReason(reason)}
                  >
                    <Text style={styles.reasonText}>{reason}</Text>
                    <View style={styles.radio}>
                      {selectedReason === reason && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                ))}

                <Text style={styles.inputLabel}>Reason for cancelling (optional)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Hello..."
                  multiline
                  numberOfLines={3}
                  value={otherReason}
                  onChangeText={setOtherReason}
                />

                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>ⓘ Your submission is anonymous.</Text>
                </View>

                <TouchableOpacity 
                  style={[styles.submitButton, !selectedReason && styles.submitButtonDisabled]} 
                  onPress={handleNext}
                  disabled={!selectedReason}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 20,
    alignSelf: 'center',
  },
  stepContainer: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFE5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cancelIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FF4D4D',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#FF4D4D',
    fontWeight: 'bold',
  },
  rescheduleButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  // Step 2 styles
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  titleReason: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeBtn: {
    fontSize: 18,
    color: '#888',
    padding: 5,
  },
  reasonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  reasonText: {
    fontSize: 14,
    color: '#555',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4A85FE',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 12,
    color: '#888',
    marginTop: 16,
    marginBottom: 8,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#F4F8FF',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 24,
  },
  infoText: {
    color: '#4A85FE',
    fontSize: 12,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#4A85FE',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#A0BFFD',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CancelBookingModal;

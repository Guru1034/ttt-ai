import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const CongratulatoryModal = ({ isVisible, winner, onClose, playerName }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.congratsText}>🎉 Congratulations! 🎉</Text>
          <Text style={styles.winnerText}>{winner === 'Draw' ? "It's a Draw!" : `${playerName} Wins!`}</Text>
          {winner !== 'Draw' && (
            <ConfettiCannon count={150} origin={{ x: -10, y: 0 }} fadeOut={true} />
          )}
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  winnerText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default CongratulatoryModal;

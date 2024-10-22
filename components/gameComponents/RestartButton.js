import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RestartButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.restartButton} onPress={onPress}>
      <Text style={styles.restartButtonText}>Restart Game</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restartButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restartButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RestartButton;

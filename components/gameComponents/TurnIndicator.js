import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TurnIndicator = ({ playerName, aiName, playerSymbol, aiSymbol, currentTurn }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.playerIndicator, currentTurn === playerSymbol && styles.active]}>
        <Text style={styles.playerText}>{playerName} ({playerSymbol})</Text>
      </View>
      <View style={[styles.playerIndicator, currentTurn === aiSymbol && styles.active]}>
        <Text style={styles.playerText}>{aiName} ({aiSymbol})</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  playerIndicator: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#eee',
    margin: 10
  },
  active: {
    backgroundColor: '#bde0fe',
    borderBottomColor: 'blue',
    borderBottomWidth: 2
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TurnIndicator;


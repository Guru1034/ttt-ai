import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Board = ({ board, onPress, winningCombination }) => {
  const renderSquare = (index) => {
    const isWinningSquare = winningCombination?.includes(index);
    return (
      <TouchableOpacity key={index} // Add the unique key here
            style={[styles.square, isWinningSquare ? styles.winningSquare : null]} 
            onPress={() => onPress(index)}>
        <Text style={styles.symbol}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.board}>
      {Array(9).fill(null).map((_, index) => renderSquare(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  symbol: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  winningSquare: {
    backgroundColor: 'yellow',
  },
});

export default Board;

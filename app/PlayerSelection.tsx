import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Button } from 'react-native';
import { useRouter } from 'expo-router';

const PlayerSelection = () => {
  const [playerName, setPlayerName] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [symbol, setSymbol] = useState('X');
  const router = useRouter();

  const startGame = () => {
    if (playerName.trim()) {
      router.push({
        pathname: '/GameScreen',
        params: { playerName, difficulty, symbol },
      });
    } else {
      alert('Please enter your name to start the game.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/tictactoe-bg.jpeg')} // Background image related to Tic Tac Toe
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Player Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your name:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Player Name"
            value={playerName}
            onChangeText={setPlayerName}
          />
        </View>

        {/* Difficulty Level */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Difficulty Level:</Text>
          <View style={styles.radioContainer}>
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.radioButton,
                  difficulty === level && styles.selectedRadioButton,
                ]}
                onPress={() => setDifficulty(level)}
              >
                <Text
                  style={[
                    styles.radioText,
                    difficulty === level && styles.selectedRadioText,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Symbol Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Choose your symbol:</Text>
          <View style={styles.symbolContainer}>
            <TouchableOpacity
              style={[
                styles.symbolButton,
                symbol === 'X' && styles.selectedSymbolButton,
              ]}
              onPress={() => setSymbol('X')}
            >
              <Text
                style={[
                  styles.symbolText,
                  symbol === 'X' && styles.selectedSymbolText,
                ]}
              >
                X
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.symbolButton,
                symbol === 'O' && styles.selectedSymbolButton,
              ]}
              onPress={() => setSymbol('O')}
            >
              <Text
                style={[
                  styles.symbolText,
                  symbol === 'O' && styles.selectedSymbolText,
                ]}
              >
                O
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Start Game Button */}
        <View style={styles.startButtonContainer}>
          <Button title="Start Game" onPress={startGame} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image is properly scaled
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slight white background to enhance form readability
    margin: 20,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'semi-bold',
    marginBottom: 10,
    marginTop: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedRadioButton: {
    backgroundColor: '#4CAF50',
  },
  radioText: {
    fontSize: 16,
  },
  selectedRadioText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  symbolContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  symbolButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 60,
    marginBottom: 10
  },
  selectedSymbolButton: {
    backgroundColor: '#2196F3',
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedSymbolText: {
    color: '#fff',
  },
  startButtonContainer: {
    marginTop: 30,
  },
});

export default PlayerSelection;

import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, Alert, Vibration } from 'react-native';
import Board from '../components/gameComponents/Board';
import TurnIndicator from '../components/gameComponents/TurnIndicator';
import CongratulatoryModal from '../components/gameComponents/CongratulatoryModal';
import { checkWinner } from '../utils/gameUtils';
import { makeComputerMove } from '../utils/ai';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const GameScreen = ({ route }) => {
  const { playerName, difficulty, symbol  } = useLocalSearchParams();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState('X');
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningCombination, setWinningCombination] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

 // Set computer symbol based on player's symbol
 const aiName = 'Computer';
 const playerSymbol = symbol;
 const computerSymbol = symbol === 'X' ? 'O' : 'X';

 useEffect(() => {
   console.log('\nCurrent turn is ',playerTurn );
   if (playerTurn === computerSymbol && !isGameOver) {
     setTimeout(() => {
       const newBoard = makeComputerMove(board, difficulty, computerSymbol);
       handleMove(newBoard, computerSymbol);
     }, 1200); // 800ms delay for computer's move
   }
 }, [playerTurn]);


// Fallback alert for congratulatory modal
     useEffect(() => {
       console.log('Checking modal', isGameOver, winner);
      if (isGameOver && winner) {
        console.log('Modal visible', modalVisible);
          const timer = setTimeout(() => {
              if (!modalVisible) {
                  Alert.alert(
                      "Congratulations!",
                      `${winner} wins!`,
                      [{ text: "OK", onPress: resetGame }]
                  );
              }
          }, 500); // Delay to allow modal to potentially show first

          return () => clearTimeout(timer);
      }
  }, [isGameOver, winner, modalVisible]);

 const handleMove = (newBoard, turn) => {
   setBoard(newBoard);
   const result = checkWinner(newBoard);
   if (result.winner) {
     setIsGameOver(true);
     setWinner(result.winner);
     setWinningCombination(result.winningCombination);
     // Show the congratulatory modal
     setModalVisible(true); 
   } else {
     setPlayerTurn(turn === 'X' ? 'O' : 'X');
   }
 };

 const handlePress = (index) => {
   if (!board[index] && !isGameOver && playerTurn === symbol) {
     const newBoard = [...board];
     newBoard[index] = symbol;
     // Add haptic feedback here
     Vibration.vibrate(50); // Vibrate for 50ms
     handleMove(newBoard, symbol);
   }
 };

 // Reset game logic
 const resetGame = () => {
   setBoard(Array(9).fill(null));
   setPlayerTurn(symbol === 'X' ? 'X' : 'O');
   setIsGameOver(false);
   setWinner(null);
   setWinningCombination(null);
   setModalVisible(false);
 };


// Go back to Player Selection screen
   const restartGame = () => {
    router.push('/PlayerSelection'); // Navigates back to player selection
};

const getGradientColors = () => {
  switch (difficulty) {
    case 'Medium':
      return ['#ffcc80', '#ff9800']; // Orange gradient for Medium
    case 'Hard':
      return ['#ff80ab', '#ff4081']; // Pink gradient for Hard
    default:
      return ['#a8e6cf', '#dcedc1']; // Light Green gradient for Easy
  }
};

 return (
  <LinearGradient colors={getGradientColors()} style={styles.gradient}>
    <View style={styles.container}>
    <View style={styles.gameSettingsContainer}>
      <Text style={styles.gameSettings}>Player Name: {playerName} ({symbol})</Text>
      <Text style={styles.difficultyText}>Difficulty: {difficulty}</Text>
    </View>
      
        {/* Turn Indicator */}
        <TurnIndicator
          playerName={playerName}
          aiName={aiName}
          playerSymbol={playerSymbol}
          aiSymbol={computerSymbol}
          currentTurn={playerTurn}
        />

      <Board board={board} onPress={handlePress} winningCombination={winningCombination} />
      
      <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Reset" onPress={resetGame} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Game Settings" onPress={restartGame} />
          </View>
        </View>
      
      <CongratulatoryModal 
        isVisible={isGameOver && winner} 
        winner={winner} 
        onClose={resetGame} 
        playerName={playerName}
      />
    </View>
   </LinearGradient>
 );
};

const styles = StyleSheet.create({
gradient: {
    flex: 1,
    justifyContent: 'center',
},
 container: {
   flex: 1,
   padding: 20,
   justifyContent: 'center',
   alignItems: 'center',
 },
 difficultyText: {
  fontSize: 16,
  textAlign: 'center',
  fontWeight: 'semi-bold',
  marginBottom: 10,
},
gameSettingsContainer: {
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: '#000',
  margin: 20,
  marginTop: -30
},
 gameSettings: {
   fontSize: 16,
   marginBottom: 10,
 },
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'absolute',
  bottom: 20,
  width: '100%',
},
buttonWrapper: {
  width: '49%', // Half width for each button with slight spacing
},
});

export default GameScreen;
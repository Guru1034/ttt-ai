import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  const goToPlayerSelection = () => {
    router.push('PlayerSelection');
  };

  return (
    <ImageBackground
      source={require('../assets/images/tictactoe-bg.jpeg')} // Background image related to Tic Tac Toe
      style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Tic Tac Toe</Text>
          <Button title="Start Game" onPress={goToPlayerSelection} />
        </View>
    </ImageBackground>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image is properly scaled
    justifyContent: 'center',
  },
});

export default HomeScreen;

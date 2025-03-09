import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GameBoard from '@/components/GameBoard'; // Assuming GameBoard is the component for the game logic

const TwoPlayerScreen = () => {
  const handleReset = () => {
    // Any additional logic on reset can be added here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two Player Mode</Text>
      <View style={styles.gameBoardContainer}>
        <GameBoard onReset={handleReset} isSinglePlayer={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  gameBoardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
});

export default TwoPlayerScreen;
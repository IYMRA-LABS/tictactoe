import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GameBoard from '@/components/GameBoard';

const TwoPlayerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Two Player Mode</Text>
      <View style={styles.gameBoardContainer}>
        <GameBoard onReset={() => {}} isSinglePlayer={false} />
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
    color: '#333',
  },
  gameBoardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default TwoPlayerScreen;
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GameBoard from '@/components/GameBoard';
import { LinearGradient } from 'expo-linear-gradient';

const SinglePlayerScreen = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const handleDifficultyChange = (level: 'easy' | 'medium' | 'hard') => {
    setDifficulty(level);
  };

  return (
    <LinearGradient
      colors={['#f8f9fa', '#e9ecef']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      
      <View style={styles.content}>
        <Text style={styles.title}>Choose Difficulty</Text>
        
        <View style={styles.difficultyContainer}>
          {['easy', 'medium', 'hard'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.difficultyButton,
                difficulty === level && styles.selectedButton
              ]}
              onPress={() => handleDifficultyChange(level as 'easy' | 'medium' | 'hard')}
            >
              <Text style={styles.buttonText}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.gameBoardWrapper}>
          <GameBoard difficulty={difficulty} isSinglePlayer={true} onReset={() => {}} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
    marginVertical: 24,
    letterSpacing: 0.5,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  difficultyButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 16,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedButton: {
    backgroundColor: '#3b82f6',
    shadowColor: '#3b82f6',
  },
  buttonText: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  gameBoardWrapper: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
});

export default SinglePlayerScreen; 
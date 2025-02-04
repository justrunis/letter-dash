import React from "react";
import { View, StyleSheet } from "react-native";
import Board from "../components/Game/Board";
import Keyboard from "../components/Game/Keyboard";
import GameOverModal from "../components/Game/Modal";
import useWordleLogic from "../hooks/useWordleLogic";

export default function GameScreen() {
  const {
    guesses,
    currentGuess,
    isValidWord,
    addLetter,
    deleteLetter,
    submitGuess,
    reset,
    isGameOver,
    targetWord,
    maxAttempts,
    wordLength,
  } = useWordleLogic();

  const handleKeyPress = (key) => {
    if (isGameOver) return;
    if (key === "Enter") {
      submitGuess();
    } else if (key === "Delete") {
      deleteLetter();
    } else {
      addLetter(key.toLowerCase());
    }
  };

  return (
    <View style={styles.container}>
      <Board
        guesses={guesses}
        currentGuess={currentGuess}
        maxAttempts={maxAttempts}
        wordLength={wordLength}
      />
      <Keyboard onKeyPress={handleKeyPress} />
      <GameOverModal
        visible={isGameOver}
        won={guesses.some((guess) => guess.word === targetWord)}
        onRestart={() => {
          reset();
        }}
      />
      <GameOverModal visible={!isValidWord} won={false} reset />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

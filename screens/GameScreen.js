import React from "react";
import { View, StyleSheet, Button } from "react-native";
import Board from "../components/Game/Board";
import Keyboard from "../components/Game/Keyboard";
import GameOverModal from "../components/Game/GameOverModal";
import useWordleLogic from "../hooks/useWordleLogic";
import { Colors } from "../constants/colors";

export default function GameScreen({ navigation }) {
  const {
    guesses,
    currentGuess,
    addLetter,
    deleteLetter,
    submitGuess,
    restart,
    isGameOver,
    targetWord,
    maxAttempts,
    wordLength,
    attemptsCount,
    timeTaken,
    score,
    keyEvaluations,
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

  const restartGame = () => {
    navigation.navigate("Home");
    restart();
  };

  const fetchNewWord = () => {
    // Check if the game is over and the target word has not been guessed
    const hasGuessedCorrectly = guesses.some(
      (guess) => guess.word === targetWord
    );
    if (!hasGuessedCorrectly && isGameOver) {
      restart();
    }
  };

  const closeModal = () => {};

  return (
    <View style={styles.container}>
      <Board
        guesses={guesses}
        currentGuess={currentGuess}
        maxAttempts={maxAttempts}
        wordLength={wordLength}
      />
      <Keyboard
        onKeyPress={handleKeyPress}
        keyEvaluations={keyEvaluations} // Pass keyEvaluations here
      />

      <GameOverModal
        visible={isGameOver}
        won={guesses.some((guess) => guess.word === targetWord)}
        onRestart={restart}
        onClose={restartGame}
        attempts={attemptsCount}
        timeTaken={timeTaken}
        score={score}
        targetWord={targetWord}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.primary100,
  },
});

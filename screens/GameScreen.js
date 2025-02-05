import React from "react";
import { View, StyleSheet } from "react-native";
import Board from "../components/Game/Board";
import Keyboard from "../components/Game/Keyboard";
import GameOverModal from "../components/Game/GameOverModal";
import useWordleLogic from "../hooks/useWordleLogic";

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
    backgroundColor: "#f5f5f5",
  },
});

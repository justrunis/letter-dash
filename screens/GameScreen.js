import { useEffect, useState } from "react";
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

  return (
    <View style={styles.container}>
      <Board
        guesses={guesses}
        currentGuess={currentGuess}
        maxAttempts={maxAttempts}
        wordLength={wordLength}
      />
      {isGameOver ? (
        <GameOverModal
          visible={isGameOver}
          won={guesses.some((guess) => guess.word === targetWord)}
          onRestart={restart}
          attempts={attemptsCount}
          timeTaken={timeTaken}
          score={score}
          targetWord={targetWord}
        />
      ) : (
        <Keyboard onKeyPress={handleKeyPress} keyEvaluations={keyEvaluations} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.primary100,
  },
});

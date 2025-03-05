import { ScrollView, StyleSheet, Text, Button } from "react-native";
import Board from "../components/Game/Board";
import Keyboard from "../components/Game/Keyboard";
import useWordleLogic from "../hooks/useWordleLogic";
import { Colors } from "../constants/colors";
import GameEndCard from "../components/DailyGame/GameEndCard";
import { useSelector } from "react-redux";
import { isTokenExpired } from "../auth/auth";

export default function DailyGameScreen({ navigation }) {
  const dailyWord = true;
  const token = useSelector((state) => state.auth.userToken);

  const {
    guesses,
    currentGuess,
    addLetter,
    deleteLetter,
    submitGuess,
    refreshDailyGame,
    isGameOver,
    maxAttempts,
    wordLength,
    attemptsCount,
    timeTaken,
    targetWord,
    score,
    keyEvaluations,
  } = useWordleLogic(dailyWord); // targetWord, guesses

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

  if (isTokenExpired(token)) {
    return (
      <ScrollView contentContainerStyle={styles.centeredContainer}>
        <Text style={styles.message}>
          Your session has expired. Please log in again.
        </Text>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        />
      </ScrollView>
    );
  }

  if (!token) {
    return (
      <ScrollView contentContainerStyle={styles.centeredContainer}>
        <Text style={styles.message}>Please login to play the daily game.</Text>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Board
        guesses={guesses}
        currentGuess={currentGuess}
        maxAttempts={maxAttempts}
        wordLength={wordLength}
      />
      {isGameOver ? (
        <GameEndCard
          attemptsCount={attemptsCount}
          timeTaken={timeTaken}
          score={score}
          targetWord={targetWord}
        />
      ) : (
        <Keyboard onKeyPress={handleKeyPress} keyEvaluations={keyEvaluations} />
      )}
    </ScrollView>
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.primary100,
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.text,
  },
});

import { View, StyleSheet, Text } from "react-native";
import Board from "../components/Game/Board";
import Keyboard from "../components/Game/Keyboard";
import useWordleLogic from "../hooks/useWordleLogic";
import { Colors } from "../constants/colors";
import GameEndCard from "../components/DailyGame/GameEndCard";

export default function DailyGameScreen({ navigation }) {
  const dailyWord = "hello";

  const {
    guesses,
    currentGuess,
    addLetter,
    deleteLetter,
    submitGuess,
    isGameOver,
    targetWord,
    maxAttempts,
    wordLength,
    attemptsCount,
    timeTaken,
    score,
    keyEvaluations,
  } = useWordleLogic(dailyWord);

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

  const close = () => {
    navigation.navigate("Home");
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
        <GameEndCard
          attemptsCount={attemptsCount}
          timeTaken={timeTaken}
          score={score}
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

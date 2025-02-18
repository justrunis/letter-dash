import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  RefreshControl,
  DevSettings,
} from "react-native";
import Board from "../components/Game/Board";
import Keyboard from "../components/Game/Keyboard";
import useWordleLogic from "../hooks/useWordleLogic";
import { Colors } from "../constants/colors";
import GameEndCard from "../components/DailyGame/GameEndCard";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";

export default function DailyGameScreen({ navigation }) {
  const dailyWord = true;
  const token = useSelector((state) => state.auth.userToken);

  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshDailyGame();
    DevSettings.reload();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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

  if (!token) {
    return (
      <ScrollView
        contentContainerStyle={styles.centeredContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
});

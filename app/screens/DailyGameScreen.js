import { View, StyleSheet, Text } from "react-native";
import Board from "../components/Game/Board";
import Keyboard from "../components/Game/Keyboard";
import useWordleLogic from "../hooks/useWordleLogic";
import { Colors } from "../constants/colors";
import GameEndCard from "../components/DailyGame/GameEndCard";
import { useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { useEffect, useState } from "react";

export default function DailyGameScreen({ navigation }) {
  const [dailyWord, setDailyWord] = useState(null);
  const token = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    const getDailyWord = async () => {
      try {
        const URL = process.env.EXPO_PUBLIC_API_URL + "/daily-challenge";
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const data = await response.json();
          Toast.error(data.message);
          return;
        }
        const data = await response.json();
        setDailyWord(data.word);
      } catch (error) {
        Toast.error("Failed to fetch the daily word.");
      }
    };

    if (token) {
      getDailyWord();
    }
  }, [token]);

  const {
    guesses,
    currentGuess,
    addLetter,
    deleteLetter,
    submitGuess,
    isGameOver,
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

  if (!token) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.message}>Please login to play the daily game.</Text>
      </View>
    );
  }

  if (!dailyWord) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.message}>Loading daily word...</Text>
      </View>
    );
  }

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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
});

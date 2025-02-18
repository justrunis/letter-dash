import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function GameEndCard({
  attemptsCount,
  timeTaken,
  score,
  targetWord,
}) {
  const isSuccess = attemptsCount !== null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSuccess ? "Congratulations!" : "Game Over!"}
      </Text>
      <Ionicons
        name={isSuccess ? "checkmark-circle" : "close-circle"}
        size={50}
        color={isSuccess ? Colors.correct : Colors.error}
        style={styles.icon}
      />
      <Text style={styles.text}>
        {isSuccess
          ? `You guessed the daily word in ${attemptsCount} attempt(s)!`
          : `You did not guess the daily word ${targetWord} :(`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 10,
  },
  icon: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
  },
});

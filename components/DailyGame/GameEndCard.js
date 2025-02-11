import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function GameEndCard({ attemptsCount, timeTaken, score }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      <Text style={styles.text}>You guessed the daily word!</Text>
      <Text style={styles.text}>Attempts: {attemptsCount}</Text>
      <Text style={styles.text}>Time Taken: {timeTaken.toFixed(1)}s</Text>
      <Text style={styles.text}>Score: {score}</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary700,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: Colors.primary700,
    marginBottom: 10,
  },
});

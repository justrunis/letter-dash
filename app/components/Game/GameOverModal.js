import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "../UI/Button";

export default function GameOverModal({
  onRestart,
  won,
  attempts,
  timeTaken,
  score,
  targetWord,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>
          {won ? "Congratulations!" : "Game Over"}
        </Text>
        {won ? (
          <Text style={styles.message}>
            You guessed the word in {attempts} attempt
            {attempts > 1 ? "s" : ""} and it took {timeTaken.toFixed(1)}{" "}
            seconds.
            {"\n"}
            Your score is: {score}.
          </Text>
        ) : (
          <Text style={styles.message}>
            Better luck next time. The word was "{targetWord}".
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <Button
            onPress={onRestart}
            backgroundColor={Colors.accent500}
            color={Colors.text}
          >
            Restart
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 10,
    width: "100%",
  },
  modal: {
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

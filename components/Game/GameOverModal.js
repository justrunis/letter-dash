import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function GameOverModal({
  visible,
  onRestart,
  onClose,
  won,
  attempts,
  timeTaken,
  score,
  targetWord,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
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
              title="Restart"
              onPress={onRestart}
              color={Colors.accent500}
            />
            <Button title="Close" onPress={onClose} color={Colors.error} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
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

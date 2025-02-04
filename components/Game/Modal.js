import { Modal, View, Text, Button, StyleSheet } from "react-native";

export default function GameOverModal({ visible, onRestart, won }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {won ? "Congratulations!" : "Game Over"}
          </Text>
          <Text style={styles.message}>
            {won
              ? "You guessed the word!"
              : "Better luck next time. The word was 'alchemy'."}
          </Text>
          <Button title="Restart" onPress={onRestart} />
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

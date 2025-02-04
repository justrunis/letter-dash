import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ ...styles.container, backgroundColor: Colors.primary100 }}>
      <Text style={styles.title}>Welcome to Letter-Box!</Text>
      <Text style={styles.description}>
        In Letter-Box, your goal is to guess the hidden word within a limited
        number of tries. Each guess provides clues: a green letter means it's
        correct and in the right spot, yellow indicates the letter is correct
        but in the wrong position, and gray means the letter is not in the word.
        Use your word skills to crack the puzzle and challenge yourself!
      </Text>
      <Button title="Go to Game" onPress={() => navigation.navigate("Game")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

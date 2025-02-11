import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import ClueRow from "../components/Home/ClueRow";

export default function HomeScreen({ navigation }) {
  const clues = [
    { color: Colors.correct, text: "Correct letter in the correct spot." },
    { color: Colors.present, text: "Correct letter in the wrong spot." },
    { color: Colors.absent, text: "Letter not in the word." },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Letter-Box!</Text>
      <View>
        <Text style={styles.description}>
          In Letter-Box, your goal is to guess the hidden word within a limited
          number of tries. Each guess provides clues:
        </Text>
        {clues.map((clue, index) => (
          <ClueRow
            key={index}
            indicatorColor={clue.color}
            description={clue.text}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Game"
          onPress={() => navigation.navigate("Game")}
          color={Colors.primary500}
        />
        <Button
          title="Daily Game"
          onPress={() => navigation.navigate("DailyGame")}
          color={Colors.primary500}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    alignItems: "start",
    justifyContent: "space-evenly",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary700,
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "start",
    marginBottom: 20,
  },
  clueContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 10,
  },
  clue: {
    width: 30,
    height: 30,
    borderRadius: 5,
    textAlign: "center",
    textAlignVertical: "center",
    color: Colors.text,
    marginRight: 10,
  },
  clueText: {
    fontSize: 16,
    color: Colors.text,
  },
});

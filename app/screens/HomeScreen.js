import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Colors } from "../constants/colors";
import ClueRow from "../components/Home/ClueRow";

export default function HomeScreen({ navigation }) {
  const clues = [
    { color: Colors.correct, text: "Correct letter in the correct spot." },
    { color: Colors.present, text: "Correct letter in the wrong spot." },
    { color: Colors.absent, text: "Letter not in the word." },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome to Letter Dash!</Text>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/icon.png")} style={styles.image} />
      </View>
      <Text style={styles.description}>
        In Letter Dash, your goal is to guess the hidden five-letter word within
        six attempts. Each guess provides feedback:
      </Text>

      <View>
        {clues.map((clue, index) => (
          <ClueRow
            key={index}
            indicatorColor={clue.color}
            description={clue.text}
          />
        ))}
      </View>
      <Text style={styles.sectionTitle}>Tips and Strategies</Text>
      <Text style={styles.description}>
        - Start with a word that includes common vowels and consonants to
        maximize information from your first guess.{"\n"}- Pay attention to the
        color feedback to deduce letter positions and exclusions.{"\n"}- Avoid
        repeating letters that have been marked as absent.{"\n"}- Practice
        regularly to improve your word-guessing skills.
      </Text>
      <Text style={styles.sectionTitle}>Daily Challenges</Text>
      <Text style={styles.description}>
        Play daily puzzles and unlock achievements to track your progress.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start Game"
          onPress={() => {
            navigation.navigate("Game");
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    paddingBottom: 40,
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    aspectRatio: 3 / 2,
    resizeMode: "contain",
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary700,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
});

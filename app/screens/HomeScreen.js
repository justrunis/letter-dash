import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Colors } from "../constants/colors";
import ClueRow from "../components/Home/ClueRow";
import SectionWithButtons from "../components/Home/SectionWithButtons";

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
        six attempts. Each guess provides feedback as you try to guess the
        correct word:
      </Text>

      <View style={styles.clueContainer}>
        {clues.map((clue, index) => (
          <ClueRow
            key={index}
            indicatorColor={clue.color}
            description={clue.text}
          />
        ))}
      </View>

      <SectionWithButtons
        title="Tips and Strategies"
        description={
          <>
            <Text style={styles.bold}>
              - Start with a word that includes common vowels and consonants
            </Text>
            {"\n"}
            <Text style={styles.bold}>
              - Pay attention to the color feedback to deduce letter positions
            </Text>
            {"\n"}
            <Text style={styles.bold}>
              - Avoid repeating letters that have been marked as absent
            </Text>
            {"\n"}
            <Text style={styles.bold}>
              - Practice regularly to improve your word-guessing skills
            </Text>
          </>
        }
        buttons={[]}
      />

      <SectionWithButtons
        title="Profile"
        description="Create a profile to track your progress and unlock achievements."
        buttons={[
          {
            onPress: () => navigation.navigate("Profile"),
            backgroundColor: Colors.primary500,
            color: Colors.white,
            text: "Create/View Profile",
          },
        ]}
      />

      <SectionWithButtons
        title="Daily Challenges"
        description="Play daily puzzles and unlock achievements to track your progress."
        buttons={[
          {
            onPress: () => navigation.navigate("DailyGame"),
            backgroundColor: Colors.primary500,
            color: Colors.white,
            text: "Start Daily Game",
          },
        ]}
      />

      <SectionWithButtons
        title="Achievements"
        description="Unlock achievements to track your progress and show off your skills."
        buttons={[
          {
            onPress: () => navigation.navigate("Achievements"),
            backgroundColor: Colors.primary500,
            color: Colors.white,
            text: "View Achievements",
          },
        ]}
      />

      <SectionWithButtons
        title="Leaderboard"
        description="Compete with other players and show off your word-guessing skills."
        buttons={[
          {
            onPress: () => navigation.navigate("Leaderboard"),
            backgroundColor: Colors.primary500,
            color: Colors.white,
            text: "View Leaderboard",
          },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
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
    lineHeight: 24,
  },
  clueContainer: {
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function ClueRow({ indicatorColor, description }) {
  const getRandomLetter = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters[Math.floor(Math.random() * letters.length)].toUpperCase();
  };

  return (
    <View style={styles.clueRow}>
      <View style={[styles.indicator, { backgroundColor: indicatorColor }]}>
        <Text style={styles.indicatorText}>{getRandomLetter()}</Text>
      </View>
      <Text style={styles.clueText}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  clueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  indicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorText: {
    textAlign: "center",
    color: Colors.text,
    fontWeight: "bold",
  },
  clueText: {
    fontSize: 16,
    color: Colors.text,
  },
});

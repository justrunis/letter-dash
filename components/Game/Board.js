import React from "react";
import { View, StyleSheet } from "react-native";
import Row from "./Row";

export default function Board({
  guesses,
  currentGuess,
  maxAttempts,
  wordLength,
}) {
  const rows = [];

  for (let i = 0; i < maxAttempts; i++) {
    if (i < guesses.length) {
      rows.push(
        <Row
          key={i}
          letters={guesses[i].word.split("")}
          evaluation={guesses[i].evaluation}
          wordLength={wordLength}
        />
      );
    } else if (i === guesses.length) {
      rows.push(
        <Row
          key={i}
          letters={currentGuess.split("")}
          evaluation={[]}
          wordLength={wordLength}
        />
      );
    } else {
      rows.push(
        <Row key={i} letters={[]} evaluation={[]} wordLength={wordLength} />
      );
    }
  }

  return <View style={styles.board}>{rows}</View>;
}

const styles = StyleSheet.create({
  board: {
    marginVertical: 20,
  },
});

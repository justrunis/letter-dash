import { View, StyleSheet } from "react-native";
import LetterBox from "./LetterBox";

export default function Row({ letters, evaluation, wordLength }) {
  const paddedLetters = [];
  for (let i = 0; i < wordLength; i++) {
    paddedLetters.push(letters[i] || "");
  }
  return (
    <View style={styles.row}>
      {paddedLetters.map((letter, index) => (
        <LetterBox key={index} letter={letter} evaluation={evaluation[index]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
});

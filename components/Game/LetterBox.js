import { View, Text, StyleSheet } from "react-native";

export default function LetterBox({ letter, evaluation }) {
  let backgroundColor = "#ddd"; // default (empty)

  if (evaluation === "correct") backgroundColor = "green";
  else if (evaluation === "present") backgroundColor = "gold";
  else if (evaluation === "absent") backgroundColor = "gray";

  return (
    <View style={[styles.box, { backgroundColor }]}>
      <Text style={styles.letter}>{letter.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: "#999",
    width: 40,
    height: 40,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

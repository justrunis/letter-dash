import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function LetterBox({ letter, evaluation }) {
  let backgroundColor = "#ddd"; // default (empty)

  if (evaluation === "correct") backgroundColor = Colors.correct;
  else if (evaluation === "present") backgroundColor = Colors.present;
  else if (evaluation === "absent") backgroundColor = Colors.absent;

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
    width: 50,
    height: 50,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

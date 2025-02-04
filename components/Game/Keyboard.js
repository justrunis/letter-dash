import { View, StyleSheet } from "react-native";
import Key from "./Key";

const keysLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
];

export default function Keyboard({ onKeyPress }) {
  return (
    <View style={styles.keyboard}>
      {keysLayout.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <Key key={key} label={key} onPress={() => onKeyPress(key)} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
});

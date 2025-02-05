import { View, StyleSheet, ScrollView, Button } from "react-native";
import Key from "./Key";
import { KEYS_LAYOUT } from "../../constants/constants";
import { Colors } from "../../constants/colors";

export default function Keyboard({ onKeyPress }) {
  return (
    <ScrollView contentContainerStyle={styles.keyboard}>
      {KEYS_LAYOUT.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <Key key={key} label={key} onPress={() => onKeyPress(key)} />
          ))}
        </View>
      ))}
    </ScrollView>
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

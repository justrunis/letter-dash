import React from "react";
import { View, StyleSheet } from "react-native";
import Key from "./Key";
import { KEYS_LAYOUT } from "../../constants/constants";

export default function Keyboard({ onKeyPress, keyEvaluations }) {
  return (
    <View style={styles.keyboard}>
      {KEYS_LAYOUT.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <Key
              key={key}
              label={key}
              onPress={() => onKeyPress(key)}
              evaluation={keyEvaluations[key.toLowerCase()]}
            />
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

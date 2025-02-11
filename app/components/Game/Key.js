import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function Key({ label, onPress, evaluation }) {
  const backgroundColor =
    evaluation === "correct"
      ? Colors.correct
      : evaluation === "present"
      ? Colors.present
      : evaluation === "absent"
      ? Colors.absent
      : Colors.defaultKey;

  return (
    <TouchableOpacity
      style={[styles.key, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  key: {
    borderWidth: 1,
    borderColor: Colors.primary500,
    borderRadius: 5,
    padding: 9,
    margin: 3,
    minWidth: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
});

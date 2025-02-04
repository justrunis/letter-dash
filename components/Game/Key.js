import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Key({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.key} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  key: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    margin: 3,
    minWidth: 30,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
});

import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function ErrorIndicator({ message }) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.errorBackground || "red",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
  },
  text: {
    color: Colors.errorText || "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

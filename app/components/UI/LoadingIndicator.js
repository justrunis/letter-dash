import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary500} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

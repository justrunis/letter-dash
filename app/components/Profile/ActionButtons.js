import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const ActionButtons = ({ onLogout }) => (
  <View style={styles.buttonContainer}>
    <Button color={Colors.error} title="Logout" onPress={onLogout} />
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    marginTop: 20,
  },
});

export default ActionButtons;

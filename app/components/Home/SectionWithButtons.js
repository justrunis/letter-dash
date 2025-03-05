import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../UI/Button";
import { Colors } from "../../constants/colors";

export default function SectionWithButtons({ title, description, buttons }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {buttons.map((button, index) => (
        <Button
          key={index}
          onPress={button.onPress}
          backgroundColor={button.backgroundColor}
          color={button.color}
        >
          {button.text}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary700,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 15,
    lineHeight: 24,
  },
});

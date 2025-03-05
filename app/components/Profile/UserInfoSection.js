import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "../../util/helpers";
import { Colors } from "../../constants/colors";

export default function UserInfoSection({
  email = "Unknown",
  dayStreak = 0,
  totalCorrectGuesses = 0,
  createdAt = new Date(),
}) {
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Ionicons name="mail-outline" size={24} color={Colors.primary50} />
        <Text style={styles.infoText}>{email}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="flame-outline" size={24} color={Colors.accent700} />
        <Text style={styles.infoText}>Current Day Streak: {dayStreak}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons
          name="checkmark-circle-outline"
          size={24}
          color={Colors.secondary500}
        />
        <Text style={styles.infoText}>
          Total correct guesses: {totalCorrectGuesses}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={24} color={Colors.accent500} />
        <Text style={styles.infoText}>
          Member Since: {formatDate(createdAt)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
});

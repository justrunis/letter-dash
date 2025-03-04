import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "../../util/helpers";

const UserInfoSection = ({ email, dayStreak, createdAt }) => (
  <View>
    <View style={styles.infoRow}>
      <Ionicons name="mail-outline" size={20} color="black" />
      <Text style={styles.infoText}>{email}</Text>
    </View>
    <View style={styles.infoRow}>
      <Ionicons name="flame-outline" size={20} color="black" />
      <Text style={styles.infoText}>Day Streak: {dayStreak}</Text>
    </View>
    <View style={styles.infoRow}>
      <Ionicons name="calendar-outline" size={20} color="black" />
      <Text style={styles.infoText}>Member Since: {formatDate(createdAt)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default UserInfoSection;

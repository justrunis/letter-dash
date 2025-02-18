import { View, Text, StyleSheet, ScrollView } from "react-native";
import AchievementCard from "../components/Achievements/AchievementCard";
import { ALL_ACHIEVEMENTS } from "../constants/constants";
import { Colors } from "../constants/colors";

export default function AchievementsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <ScrollView>
        <View style={styles.achievementContainer}>
          {ALL_ACHIEVEMENTS.map((achievement, index) => (
            <AchievementCard
              key={index}
              title={achievement.title}
              description={achievement.description}
              icon={achievement.icon}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    alignItems: "center",
    justifyContent: "center",
  },
  achievementContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});

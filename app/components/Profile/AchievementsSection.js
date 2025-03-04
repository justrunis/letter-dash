import { View, Text, StyleSheet } from "react-native";
import AchievementCard from "../Achievements/AchievementCard";
import { formatDate } from "../../util/helpers";

const AchievementsSection = ({ earnedAchievements }) => (
  <View style={styles.achievementsContainer}>
    <Text style={styles.achievement}>Achievements</Text>
    {earnedAchievements.length > 0 ? (
      earnedAchievements.map((achievement) => (
        <View style={styles.achievementContainer} key={achievement._id}>
          <AchievementCard
            title={achievement.title}
            description={achievement.description}
            icon={achievement.icon}
            achievementDate={formatDate(achievement.dateUnlocked)}
          />
        </View>
      ))
    ) : (
      <Text style={styles.noAchievementsText}>No achievements yet.</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  achievementsContainer: {
    marginBottom: 20,
  },
  achievement: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  achievementContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  noAchievementsText: {
    fontSize: 16,
    marginLeft: 30,
    fontStyle: "italic",
  },
});

export default AchievementsSection;

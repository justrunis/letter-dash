import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import AchievementCard from "../components/Achievements/AchievementCard";
import { Colors } from "../constants/colors";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { useState, useCallback, useEffect } from "react";

export default function AchievementsScreen() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const URL = process.env.EXPO_PUBLIC_API_URL + "/achievement";
      const response = await fetch(URL, { method: "GET" });

      if (!response.ok) {
        const data = await response.json();
        Toast.error(data.message);
        return;
      }

      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      Toast.error("Failed to fetch achievements.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAchievements();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.achievementContainer}>
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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

import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { Colors } from "../constants/colors";
import { useState, useEffect, useCallback } from "react";

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchLeaderboard();
    setRefreshing(false);
  }, []);

  const fetchLeaderboard = async () => {
    const URL = process.env.EXPO_PUBLIC_API_URL + "/leaderboard";
    const response = await fetch(URL, { method: "GET" });
    if (!response.ok) {
      const data = await response.json();
      Toast.error(data.message);
      return;
    }
    const data = await response.json();
    setLeaderboard(data.users);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.text, styles.username]}>{item.username}</Text>
      <Text style={[styles.text, styles.dayStreak]}>{item.dayStreak}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.leaderboardContainer}>
        <View style={styles.header}>
          <Text style={[styles.text, styles.headerName]}>Name</Text>
          <Text style={[styles.text, styles.headerDayStreak]}>Days Streak</Text>
        </View>

        <FlatList
          data={leaderboard}
          renderItem={renderItem}
          keyExtractor={(item) => item.username}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No users found</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary700,
    marginBottom: 20,
    textAlign: "center",
  },
  leaderboardContainer: {
    width: "100%",
    backgroundColor: Colors.primary400,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.primary600,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
  },
  headerName: {
    width: "60%",
    textAlign: "left",
    color: Colors.accent500,
  },
  headerDayStreak: {
    width: "40%",
    textAlign: "right",
    color: Colors.accent500,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary400,
  },
  username: {
    width: "60%",
    textAlign: "left",
  },
  dayStreak: {
    width: "40%",
    textAlign: "right",
  },
  emptyText: {
    textAlign: "center",
    color: Colors.primary700,
    fontSize: 18,
    marginTop: 20,
  },
});

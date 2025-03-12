import { View, Text, StyleSheet, FlatList } from "react-native";
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
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.columnValue}>{item.totalCorrectGuesses}</Text>
      <Text style={styles.columnValue}>{item.dayStreak}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.leaderboardContainer}>
        <View style={styles.header}>
          <Text style={styles.headerName}>Name</Text>
          <Text style={styles.headerColumn}>Total Correct</Text>
          <Text style={styles.headerColumn}>Days Streak</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary800,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary700,
    paddingHorizontal: 10,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
  },
  headerName: {
    flex: 2,
    textAlign: "start",
    color: Colors.accent500,
  },
  headerColumn: {
    flex: 1,
    textAlign: "center",
    color: Colors.accent500,
  },
  username: {
    flex: 2,
    textAlign: "left",
  },
  columnValue: {
    flex: 1,
    textAlign: "center",
  },
  totalCorrectGuesses: {
    flex: 1,
    textAlign: "center",
  },
  dayStreak: {
    flex: 1,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    color: Colors.primary700,
    fontSize: 18,
    marginTop: 20,
  },
});

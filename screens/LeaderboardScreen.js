import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { Colors } from "../constants/colors";
import { DataTable } from "react-native-paper";
import { TEMP_LEADERBOARD } from "../constants/constants";
import { useState } from "react";

TEMP_LEADERBOARD.sort((a, b) => b.score - a.score);

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState(TEMP_LEADERBOARD);
  const [sortColumn, setSortColumn] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  const handleSort = (column) => {
    const newIsAscending = sortColumn === column ? !isAscending : true;
    const sortedLeaderboard = [...leaderboard].sort((a, b) => {
      let comparison = 0;
      switch (column) {
        case "score":
          comparison = a.score - b.score;
          break;
        case "days":
          comparison = a.days - b.days;
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        default:
          return 0;
      }
      return newIsAscending ? comparison : -comparison;
    });
    setLeaderboard(sortedLeaderboard);
    setSortColumn(column);
    setIsAscending(newIsAscending);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title
              onPress={() => handleSort("name")}
              sortDirection={
                sortColumn === "name"
                  ? isAscending
                    ? "ascending"
                    : "descending"
                  : null
              }
            >
              Name
            </DataTable.Title>
            <DataTable.Title
              numeric
              onPress={() => handleSort("score")}
              sortDirection={
                sortColumn === "score"
                  ? isAscending
                    ? "ascending"
                    : "descending"
                  : null
              }
            >
              Score
            </DataTable.Title>
            <DataTable.Title
              numeric
              onPress={() => handleSort("days")}
              sortDirection={
                sortColumn === "days"
                  ? isAscending
                    ? "ascending"
                    : "descending"
                  : null
              }
            >
              Days
            </DataTable.Title>
          </DataTable.Header>
          {leaderboard.map((item, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>{item.score}</DataTable.Cell>
              <DataTable.Cell numeric>{item.days}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    padding: 20,
    backgroundColor: Colors.primary100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    gap: 10,
    width: "100%",
  },
  table: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary700,
    marginBottom: 10,
  },
});

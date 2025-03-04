import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  RefreshControl,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "../../util/helpers";
import { DEFAULT_AVATAR_IMAGE } from "../../constants/constants";
import { Colors } from "../../constants/colors";
import AchievementCard from "../Achievements/AchievementCard";
import LoadingIndicator from "../UI/LoadingIndicator"; // Assuming you have a LoadingIndicator component

export default function ProfileCard({ onLogout }) {
  const token = useSelector((state) => state.auth.userToken);
  const [refreshing, setRefreshing] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    dayStreak: 0,
    createdAt: "",
    achievements: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [token]);

  async function fetchData() {
    try {
      setIsLoading(true);

      // Fetch user data
      const URL = process.env.EXPO_PUBLIC_API_URL + "/user/profile";
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUserData(data);

      // Fetch achievements data
      const URL2 = process.env.EXPO_PUBLIC_API_URL + "/achievement";
      const response2 = await fetch(URL2, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const achievementsData = await response2.json();

      if (!response2.ok) {
        throw new Error(achievementsData.message);
      }

      setAchievements(achievementsData);
    } catch (error) {
      Toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdateUsername = async () => {
    try {
      const URL = process.env.EXPO_PUBLIC_API_URL + "/user/update";
      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: userData.username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setEditing(false);
      Toast.success("Username updated successfully!");
    } catch (error) {
      Toast.error(error.message);
    }
  };

  // Filter the achievements the user has earned
  const earnedAchievements = userData.achievements
    .map((userAchievement) => {
      const achievement = achievements.find(
        (ach) => ach._id.toString() === userAchievement.achievementId.toString()
      );
      return achievement
        ? {
            ...achievement,
            dateUnlocked: userAchievement.dateUnlocked,
          }
        : null;
    })
    .filter((achievement) => achievement !== null);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <View style={styles.header}>
            <Image
              source={{
                uri: DEFAULT_AVATAR_IMAGE,
              }}
              style={styles.avatar}
            />
            {editing ? (
              <TextInput
                style={styles.usernameInput}
                value={userData.username}
                onChangeText={(text) =>
                  setUserData((prevData) => ({ ...prevData, username: text }))
                }
                autoFocus
              />
            ) : (
              <Text style={styles.username}>{userData.username}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="black" />
            <Text style={styles.infoText}>{userData.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="flame-outline" size={20} color="black" />
            <Text style={styles.infoText}>
              Day Streak: {userData.dayStreak}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="black" />
            <Text style={styles.infoText}>
              Member Since: {formatDate(userData.createdAt)}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button color={Colors.error} title="Logout" onPress={onLogout} />
            {editing ? (
              <Button
                color={Colors.primary}
                title="Save"
                onPress={handleUpdateUsername}
              />
            ) : (
              <Button
                color={Colors.primary}
                title="Edit Username"
                onPress={() => setEditing(true)}
              />
            )}
          </View>
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
              <Text style={styles.noAchievementsText}>
                No achievements yet.
              </Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary400,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  usernameInput: {
    fontSize: 24,
    fontWeight: "bold",
    borderBottomWidth: 1,
    width: "80%",
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    marginVertical: 10,
  },
});

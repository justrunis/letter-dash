import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import AvatarSection from "./AvatarSection";
import UserInfoSection from "./UserInfoSection";
import AchievementsSection from "./AchievementsSection";
import ActionButtons from "./ActionButtons";
import LoadingIndicator from "../UI/LoadingIndicator"; // Assuming you have a LoadingIndicator component
import { Colors } from "../../constants/colors";
import { isTokenExpired } from "../../auth/auth";

export default function ProfileCard({ navigation, onLogout }) {
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
        Toast.error(data.message);
      }

      setEditing(false);
      Toast.success("Username updated successfully!");
    } catch (error) {
      Toast.error(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
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

  if (isTokenExpired(token)) {
    return (
      <ScrollView contentContainerStyle={styles.centeredContainer}>
        <Text style={styles.message}>
          Your session has expired. Please log in again.
        </Text>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        />
      </ScrollView>
    );
  }

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
          <AvatarSection
            username={userData.username}
            editing={editing}
            setUsername={(text) =>
              setUserData((prevData) => ({ ...prevData, username: text }))
            }
            onEdit={() => setEditing(true)}
            onCancel={handleCancelEdit}
            onSave={handleUpdateUsername}
          />
          <UserInfoSection
            email={userData.email}
            dayStreak={userData.dayStreak}
            createdAt={userData.createdAt}
          />
          <AchievementsSection earnedAchievements={earnedAchievements} />
          <ActionButtons
            onLogout={onLogout}
            onEdit={handleUpdateUsername}
            editing={editing}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary400,
    padding: 20,
    borderRadius: 8,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: Colors.primary100,
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.text,
  },
});

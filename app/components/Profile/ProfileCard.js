import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { Toast } from "toastify-react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDate } from "../../util/helpers";
import { DEFAULT_AVATAR_IMAGE } from "../../constants/constants";
import { Colors } from "../../constants/colors";

export default function ProfileCard({ onLogout }) {
  const token = useSelector((state) => state.auth.userToken);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    totalScore: 0,
    dayStreak: 0,
    createdAt: "",
    updatedAt: "",
    achievements: [],
  });

  async function fetchUserData() {
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
      Toast.error(data.message);
      return;
    }
    setUserData(data);
  }

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: DEFAULT_AVATAR_IMAGE,
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{userData.username}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="mail-outline" size={20} color="black" />
        <Text style={styles.infoText}>{userData.email}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="trophy-outline" size={20} color="black" />
        <Text style={styles.infoText}>Total Score: {userData.totalScore}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="flame-outline" size={20} color="black" />
        <Text style={styles.infoText}>Day Streak: {userData.dayStreak}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={20} color="black" />
        <Text style={styles.infoText}>
          Member Since: {formatDate(userData.createdAt)}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="ribbon-outline" size={20} color="black" />
        <Text style={styles.infoText}>Achievements:</Text>
      </View>
      {userData.achievements.length > 0 ? (
        userData.achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementRow}>
            <Ionicons name="checkmark-circle-outline" size={20} color="green" />
            <Text style={styles.achievementText}>{achievement}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noAchievementsText}>No achievements yet.</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button color={Colors.error} title="Logout" onPress={onLogout} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  achievementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 5,
  },
  achievementText: {
    fontSize: 16,
    marginLeft: 10,
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
    marginTop: 20,
  },
});

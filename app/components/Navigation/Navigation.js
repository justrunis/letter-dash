import { View, Text, StyleSheet, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import ToastManager from "toastify-react-native";
import HomeScreen from "../../screens/HomeScreen";
import GameScreen from "../../screens/GameScreen";
import DailyGameScreen from "../../screens/DailyGameScreen";
import LeaderboardScreen from "../../screens/LeaderboardScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import AchievementsScreen from "../../screens/AchievementsScreen";
import { DEFAULT_AVATAR_IMAGE } from "../../constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { isTokenExpired } from "../../auth/auth";
import { useEffect } from "react";
import { logout } from "../../store/slices/authSlice";
import { Toast } from "toastify-react-native";

export default function Navigation() {
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTokenExpired(token)) {
      dispatch(logout());
      Toast.warn("Your session has expired. Please log in again.");
      console.log("Token expired");
    }
  }, []);

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <ToastManager placement="top" />
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: Colors.primary500,
          drawerInactiveTintColor: Colors.primary800,
          headerStyle: {
            backgroundColor: Colors.primary500,
          },
          headerTintColor: Colors.primary800,
          tabBarStyle: {
            backgroundColor: Colors.primary500,
          },
          drawerStyle: {
            backgroundColor: Colors.primary100,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Game"
          component={GameScreen}
          options={{
            title: "Game",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="play" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="DailyGame"
          component={DailyGameScreen}
          options={{
            title: "Daily Game",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="game-controller" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            title: "Leaderboard",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={{
            title: "Achievements",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="trophy" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  const token = useSelector((state) => state.auth.userToken);
  const username = useSelector((state) => state.auth.username);
  return (
    <DrawerContentScrollView {...props}>
      {token && (
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeaderText}>Welcome to Letter Dash!</Text>

          <View style={styles.container}>
            <Image
              source={{
                uri: DEFAULT_AVATAR_IMAGE,
              }}
              style={styles.image}
            />
            <Text style={styles.text}>{username}</Text>
          </View>
        </View>
      )}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.accent500,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: Colors.primary500,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.accent500,
    marginBottom: 10,
  },
});

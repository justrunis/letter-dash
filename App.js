import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./constants/colors";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ToastManager from "toastify-react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";

import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import DailyGameScreen from "./screens/DailyGameScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ToastManager placement="top" />
          <Drawer.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primary500,
              },
              headerTintColor: Colors.gray700,
              tabBarStyle: {
                backgroundColor: Colors.primary500,
              },
              tabBarActiveTintColor: Colors.accent500,
              tabBarInactiveTintColor: Colors.gray700,
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
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

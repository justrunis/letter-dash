import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./constants/colors";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ToastManager from "toastify-react-native";

import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import DailyGameScreen from "./screens/DailyGameScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary100,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./constants/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ToastManager from "toastify-react-native";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ToastManager placement="top" />
      <Tab.Navigator
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
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Game"
          component={GameScreen}
          options={{
            title: "Game",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="play" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

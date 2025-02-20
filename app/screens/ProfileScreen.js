import React, { useState } from "react";
import { View, Image, Button, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, register, logout } from "../store/slices/authSlice";
import { resetDailyGuesses } from "../store/slices/dailyGuessSlice";
import { Colors } from "../constants/colors";
import { Toast } from "toastify-react-native";
import ProfileCard from "../components/Profile/ProfileCard";

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, email, username, isRegistered, userToken } =
    useSelector((state) => state.auth);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    const URL = process.env.EXPO_PUBLIC_API_URL + "/auth/login";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      Toast.error(data.message);
      return;
    }
    dispatch(login({ userToken: data.token, ...formData }));
    dispatch(resetDailyGuesses());
    Toast.success(data.message);
    setFormData({});
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRegister = async () => {
    const URL = process.env.EXPO_PUBLIC_API_URL + "/auth/register";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      Toast.error(data.message);
      return;
    }
    dispatch(register({ formData }));
    Toast.success(data.message);
    setFormData({});
  };

  const toggle = () => {
    setIsRegistering((prev) => !prev);
    setFormData({ username: "", email: "", password: "", passwordRepeat: "" });
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <View style={styles.profileContainer}>
          <ProfileCard onLogout={handleLogout} />
        </View>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/icon.png")}
              style={styles.image}
            />
          </View>
          {isRegistering && (
            <TextInput
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              style={styles.input}
            />
          )}
          <TextInput
            placeholder="Username"
            value={formData.username}
            onChangeText={(value) => handleInputChange("username", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            secureTextEntry
            style={styles.input}
          />
          {isRegistering && (
            <TextInput
              placeholder="Repeat Password"
              value={formData.passwordRepeat}
              onChangeText={(value) =>
                handleInputChange("passwordRepeat", value)
              }
              secureTextEntry
              style={styles.input}
            />
          )}
          <View style={styles.buttonContainer}>
            <Button
              title={isRegistering ? "Register" : "Login"}
              onPress={isRegistering ? handleRegister : handleLogin}
              color={Colors.primary500}
            />
            <Button
              title={isRegistering ? "Switch to Login" : "Switch to Register"}
              onPress={toggle}
              color={Colors.primary500}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    marginVertical: 10,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.gray700,
    borderRadius: 5,
    color: Colors.text,
    backgroundColor: Colors.gray,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    aspectRatio: 3 / 2,
    resizeMode: "contain",
  },
});

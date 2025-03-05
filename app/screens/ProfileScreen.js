import React, { useState } from "react";
import { View, Image, Button, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, register, logout } from "../store/slices/authSlice";
import { resetDailyGuesses } from "../store/slices/dailyGuessSlice";
import { Colors } from "../constants/colors";
import { Toast } from "toastify-react-native";
import ProfileCard from "../components/Profile/ProfileCard";
import LoadingIndicator from "../components/UI/LoadingIndicator";

export default function ProfileScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated, email, username, isRegistered, userToken } =
    useSelector((state) => state.auth);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const URL = process.env.EXPO_PUBLIC_API_URL + "/auth/login";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = "Failed to fetch achievements.";
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          errorMessage = `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      dispatch(login({ userToken: data.token, ...formData }));
      dispatch(resetDailyGuesses());
      Toast.success(data.message);
      setFormData({});
    } catch (error) {
      Toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const URL = process.env.EXPO_PUBLIC_API_URL + "/auth/register";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = "Failed to fetch achievements.";
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          errorMessage = `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      dispatch(register({ formData }));
      Toast.success(data.message);
      setFormData({});
    } catch (error) {
      Toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const toggle = () => {
    setIsRegistering((prev) => !prev);
    setFormData({ username: "", email: "", password: "", passwordRepeat: "" });
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <View style={styles.profileContainer}>
          <ProfileCard navigation={navigation} onLogout={handleLogout} />
        </View>
      ) : (
        <>
          {loading ? (
            <LoadingIndicator />
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
                  title={
                    isRegistering ? "Switch to Login" : "Switch to Register"
                  }
                  onPress={toggle}
                  color={Colors.primary500}
                />
              </View>
            </>
          )}
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

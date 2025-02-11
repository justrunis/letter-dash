import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, register, logout } from "../store/slices/authSlice";
import { Colors } from "../constants/colors";
import { Toast } from "toastify-react-native";

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, email, username, isRegistered } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    // call to API
    const userToken = "dummy-token";
    dispatch(login({ userToken, ...formData }));
    Toast.success("Login successful!");
    setFormData({});
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRegister = () => {
    // call to API
    dispatch(register({ formData }));
    Toast.success("Registration successful!");
    setFormData({});
  };

  const toggle = () => {
    setIsRegistering((prev) => !prev);
    setFormData({ username: "", email: "", password: "", passwordRepeat: "" });
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          <Text>
            Welcome back! {email}/{username}
          </Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            style={styles.input}
          />
          {isRegistering && (
            <TextInput
              placeholder="Username"
              value={formData.username}
              onChangeText={(value) => handleInputChange("username", value)}
              style={styles.input}
            />
          )}
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    marginVertical: 10,
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

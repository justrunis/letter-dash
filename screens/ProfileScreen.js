import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, register, logout } from "../store/slices/authSlice";

export default function ProfileScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, email, isRegistered } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    const userToken = "dummy-token";
    dispatch(login({ userToken, ...formData }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRegister = () => {
    dispatch(register({ formData }));
  };

  const toggleRegistration = () => {
    setIsRegistering((prev) => !prev);
    setFormData({ email: "", password: "" });
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          <Text>Welcome back! {email}</Text>
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
            />
            <Button
              title={isRegistering ? "Switch to Login" : "Switch to Register"}
              onPress={toggleRegistration}
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
